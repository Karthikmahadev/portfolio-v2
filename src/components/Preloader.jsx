import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ───────────────────────── tuning ───────────────────────── */

const MONOGRAM = "Km";
const PAPER = "#f1efe9";
const INK = "#0d0d0d";
const LIME = "#d4ff3a";
const RAMP_SECONDS = 2.4; // time to reach 88% before waiting on real assets
const MAX_WAIT_MS = 8000;
const TAU = Math.PI * 2;

const pad = (n, len = 3) => String(n).padStart(len, "0");
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/** Resolves when fonts and the page have loaded (capped so it can never hang). */
function waitForAssets() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const load =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((res) => window.addEventListener("load", () => res(), { once: true }));
  const timeout = new Promise((res) => setTimeout(res, MAX_WAIT_MS));
  return Promise.race([Promise.all([fonts, load]), timeout]);
}

/* ───────────────────────── component ───────────────────────── */

export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef(onComplete);
  doneRef.current = onComplete;

  useGSAP(
    (_, contextSafe) => {
      const el = root.current;
      const canvas = canvasRef.current;
      if (!el || !canvas) return;
      const ctx = canvas.getContext("2d");

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const html = document.documentElement;
      html.style.overflow = "hidden"; // lock scroll while loading
      window.scrollTo(0, 0);
      const unlock = () => {
        html.style.overflow = "";
      };

      const countEl = el.querySelector(".js-count");

      // Everything the draw loop reads. GSAP tweens these numbers.
      const s = { p: 0, swell: 0, punch: 0, punching: false };
      const mouse = { x: -999, y: -999 };

      let w = 0, h = 0, dpr = 1;
      let spacing = 24, cols = 0, rows = 0, ox = 0, oy = 0;
      let cov = new Float32Array(0); // monogram coverage per cell (0..1)
      let ord = new Float32Array(0); // diagonal reveal order per cell (0..1)
      let rad = new Float32Array(0); // radius per cell, per frame
      let cancelled = false;
      let lastCount = -1;

      /* ── grid ── */
      const size = () => {
        w = el.clientWidth;
        h = el.clientHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        spacing = Math.max(16, Math.min(30, Math.round(Math.min(w, h) / 24)));
        cols = Math.ceil(w / spacing) + 1;
        rows = Math.ceil(h / spacing) + 1;
        ox = (w - (cols - 1) * spacing) / 2;
        oy = (h - (rows - 1) * spacing) / 2;
        cov = new Float32Array(cols * rows);
        ord = new Float32Array(cols * rows);
        rad = new Float32Array(cols * rows);
      };

      /** Rasterise the monogram, then average it down to one value per grid cell. */
      const buildMask = () => {
        const S = 4; // supersampling for smooth halftone tones
        const off = document.createElement("canvas");
        off.width = cols * S;
        off.height = rows * S;
        const o = off.getContext("2d", { willReadFrequently: true });

        const fs = Math.min(off.height * 0.95, off.width * 0.62);
        o.fillStyle = "#000";
        o.font = `italic ${fs}px 'Instrument Serif', Georgia, serif`;
        o.textAlign = "center";
        o.textBaseline = "alphabetic";
        const mt = o.measureText(MONOGRAM);
        const asc = mt.actualBoundingBoxAscent ?? fs * 0.7;
        const desc = mt.actualBoundingBoxDescent ?? 0;
        o.fillText(MONOGRAM, off.width / 2, off.height / 2 + (asc - desc) / 2);

        const data = o.getImageData(0, 0, off.width, off.height).data;
        let kmin = Infinity;
        let kmax = -Infinity;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            let a = 0;
            for (let dy = 0; dy < S; dy++) {
              for (let dx = 0; dx < S; dx++) {
                a += data[((y * S + dy) * off.width + (x * S + dx)) * 4 + 3];
              }
            }
            const c = a / (S * S * 255);
            const i = y * cols + x;
            cov[i] = c;
            if (c > 0.03) {
              // Diagonal order: top-left first.
              const key = (x / cols) * 0.62 + (y / rows) * 0.38;
              ord[i] = key;
              if (key < kmin) kmin = key;
              if (key > kmax) kmax = key;
            }
          }
        }
        const span = kmax - kmin || 1;
        for (let i = 0; i < ord.length; i++) {
          if (cov[i] > 0.03) ord[i] = (ord[i] - kmin) / span;
        }
      };

      /* ── one frame ── */
      const draw = (t) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const R = spacing * 0.76; // big enough that neighbouring dots fully overlap

        // Counter text (only touches the DOM when the number changes)
        const n = Math.round(s.p * 100);
        if (n !== lastCount) {
          lastCount = n;
          countEl.textContent = pad(n);
        }

        /* Phase 3: ink sheet with holes punched through it, top-left first */
        if (s.punching) {
          ctx.fillStyle = INK;
          ctx.fillRect(0, 0, w, h);
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath();
          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const d = (x / cols) * 0.55 + (y / rows) * 0.45;
              const k = clamp((s.punch * 1.4 - d) / 0.4, 0, 1);
              const r = R * k;
              if (r > 0.4) {
                const cx = ox + x * spacing;
                const cy = oy + y * spacing;
                ctx.moveTo(cx + r, cy);
                ctx.arc(cx, cy, r, 0, TAU);
              }
            }
          }
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          return;
        }

        /* Phases 1 + 2: paper, then the dot grid */
        ctx.fillStyle = PAPER;
        ctx.fillRect(0, 0, w, h);

        const midX = w / 2;
        const midY = h / 2;
        const maxD = Math.hypot(midX, midY);
        const showMonogram = s.p > 0;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const cx = ox + x * spacing;
            const cy = oy + y * spacing;
            const dMid = Math.hypot(cx - midX, cy - midY);

            // Ambient ripple travelling out from the centre
            let r = reduce ? 0.9 : 0.8 + 0.5 * (0.5 + 0.5 * Math.sin(t * 1.6 - dMid * 0.012));

            // Cursor pushes the dots up
            if (!reduce) {
              const dm = Math.hypot(cx - mouse.x, cy - mouse.y);
              if (dm < 140) r += (1 - dm / 140) * 3.2;
            }

            // Monogram: dot size follows the letter's density
            const c = cov[i];
            if (showMonogram && c > 0.03) {
              const k = clamp((s.p * 1.3 - ord[i]) / 0.3, 0, 1);
              const tr = spacing * 0.47 * Math.pow(c, 0.8) * k;
              if (tr > r) r = tr;
            }

            // Exit: swell outward from the centre until the sheet is solid ink
            if (s.swell > 0) {
              const sw = clamp((s.swell * 1.5 - dMid / maxD) / 0.5, 0, 1);
              r += (R - r) * sw;
            }
            rad[i] = r;
          }
        }

        // Lime layer, slightly off-register, under the ink (risograph look)
        const off = spacing * 0.14;
        ctx.fillStyle = LIME;
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            if (cov[i] > 0.03 || s.swell > 0) {
              const r = rad[i];
              if (r > 0.6) {
                const cx = ox + x * spacing + off;
                const cy = oy + y * spacing + off * 0.7;
                ctx.moveTo(cx + r, cy);
                ctx.arc(cx, cy, r, 0, TAU);
              }
            }
          }
        }
        ctx.fill();

        // Ink layer
        ctx.fillStyle = INK;
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const r = rad[y * cols + x];
            if (r > 0.2) {
              const cx = ox + x * spacing;
              const cy = oy + y * spacing;
              ctx.moveTo(cx + r, cy);
              ctx.arc(cx, cy, r, 0, TAU);
            }
          }
        }
        ctx.fill();
      };

      /* ── setup ── */
      size();
      gsap.ticker.add(draw);

      // Build the mask once the serif has loaded (or after a short cap).
      const fontReady = document.fonts?.load
        ? document.fonts.load("italic 100px 'Instrument Serif'")
        : Promise.resolve();
      Promise.race([fontReady, new Promise((r) => setTimeout(r, 1500))]).then(() => {
        if (!cancelled) buildMask();
      });

      let maskTimer;
      const onResize = () => {
        clearTimeout(maskTimer);
        maskTimer = setTimeout(() => {
          size();
          buildMask();
        }, 120);
      };
      const onMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      window.addEventListener("resize", onResize);
      el.addEventListener("pointermove", onMove);

      // Quiet entrance for the small corner text
      gsap.set(".js-in", { y: 12 });
      gsap.to(".js-in", { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out" });

      /* ── timeline ── */
      const exit = contextSafe(() => {
        const tl = gsap.timeline();
        tl.to(s, { p: 1, duration: reduce ? 0.2 : 0.8, ease: "power2.out" });

        if (reduce) {
          tl.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.3 })
            .add(() => {
              unlock();
              doneRef.current?.();
            }, "<")
            .set(el, { display: "none" });
          return;
        }

        tl.to({}, { duration: 0.7 }) // let the finished monogram breathe
          .to(".js-in", { autoAlpha: 0, duration: 0.4 })
          .to(s, { swell: 1, duration: 1.2, ease: "power2.inOut" }, "<")
          .add(() => {
            s.punching = true;
            el.style.pointerEvents = "none";
            unlock();
            doneRef.current?.(); // the hero's intro starts as the first holes open
          }, "+=0.15")
          .to(s, { punch: 1, duration: 1.5, ease: "power1.inOut" }, "<")
          .set(el, { display: "none" });
      });

      // Climbs to 88% by itself, then waits for the real assets.
      const ramp = new Promise((resolve) => {
        gsap.to(s, {
          p: 0.88,
          duration: reduce ? 0.2 : RAMP_SECONDS,
          ease: "power2.inOut",
          onComplete: resolve,
        });
      });

      Promise.all([ramp, waitForAssets()]).then(() => {
        if (!cancelled) exit();
      });

      return () => {
        cancelled = true;
        clearTimeout(maskTimer);
        gsap.ticker.remove(draw);
        window.removeEventListener("resize", onResize);
        el.removeEventListener("pointermove", onMove);
        unlock();
      };
    },
    { scope: root }
  );

  return (
    <div
      id="preloader"
      ref={root}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] text-[#0d0d0d]"
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {/* Corner text only: nothing sits over the pattern */}
      <div className="pointer-events-none relative flex h-full flex-col justify-between p-6 font-mono text-[11px] uppercase tracking-[0.2em] sm:p-8 md:p-10 lg:p-12">
        <div className="flex items-start justify-between">
          <span className="js-in invisible">Karthik Mahadev</span>
          <span className="js-in invisible text-[#0d0d0d]/50">Portfolio &rsquo;26</span>
        </div>

        <div className="flex items-end justify-between">
          <span className="js-in invisible flex items-center gap-3">
            <span className="bg-[#d4ff3a] px-1.5 py-0.5 tabular-nums">
              <span className="js-count">000</span>%
            </span>
            Loading
          </span>
          <span className="js-in invisible hidden text-[#0d0d0d]/50 sm:inline">
            Full stack developer
          </span>
        </div>
      </div>
    </div>
  );
}