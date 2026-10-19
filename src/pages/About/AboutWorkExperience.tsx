import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaArrowRight } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ───────────────────────── content ───────────────────────── */

const LIME = "#d4ff3a";
const SCRAMBLE = "ABCDEFGHJKLMNPQRSTUVWXYZ";

type Kind = "ticks" | "nodes" | "bars" | "path";

const EXPERIENCE_STATS: { number: string; label: string[]; kind: Kind }[] = [
  {
    number: "2+",
    kind: "ticks",
    label: ["YEARS", "EXPERIENCE"],
  },
  {
    number: "3",
    kind: "nodes",
    label: ["PRODUCTION", "PLATFORMS"],
  },
  {
    number: "40%",
    kind: "bars",
    label: ["PERFORMANCE", "IMPROVEMENT"],
  },
  {
    number: "E2E",
    kind: "path",
    label: ["END-TO-END", "OWNERSHIP"],
  },
];

/* ───────────────────────── pieces ───────────────────────── */

function Odometer({ value }: { value: string }) {
  return (
    <span aria-label={value} className="flex tabular-nums items-baseline">
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden className="block h-[1em] overflow-hidden">
            <span className="js-reel flex flex-col" data-d={ch}>
              {Array.from({ length: 20 }, (_, k) => (
                <span key={k} className="block h-[1em] leading-none">
                  {k % 10}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="js-scr block h-[1em] leading-none" data-final={ch}>
            {ch}
          </span>
        )
      )}
    </span>
  );
}

function Mark({ kind }: { kind: Kind }) {
  const box = "h-7 w-14 shrink-0 overflow-visible";
  const fill = { transformBox: "fill-box" as const };

  if (kind === "ticks") {
    return (
      <svg viewBox="0 0 70 28" className={box} aria-hidden>
        {Array.from({ length: 10 }, (_, i) => {
          const h = 6 + i * 2.2;
          const hot = i >= 7;
          return (
            <rect
              key={i}
              className="js-tick"
              x={i * 7}
              y={28 - h}
              width="3"
              height={h}
              rx="1.5"
              fill={hot ? LIME : "currentColor"}
              opacity={hot ? 1 : 0.28}
              style={{ ...fill, transformOrigin: "bottom" }}
            />
          );
        })}
      </svg>
    );
  }

  if (kind === "nodes") {
    return (
      <svg viewBox="0 0 70 28" className={box} aria-hidden>
        <line x1="8" y1="14" x2="62" y2="14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <circle className="js-node" cx="8" cy="14" r="5" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" style={{ ...fill, transformOrigin: "center" }} />
        <circle className="js-node" cx="35" cy="14" r="5" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" style={{ ...fill, transformOrigin: "center" }} />
        <circle className="js-pulse" cx="62" cy="14" r="5" fill="none" stroke={LIME} strokeWidth="1.5" style={{ ...fill, transformOrigin: "center" }} />
        <circle className="js-node" cx="62" cy="14" r="5" fill={LIME} style={{ ...fill, transformOrigin: "center" }} />
      </svg>
    );
  }

  if (kind === "bars") {
    return (
      <svg viewBox="0 0 70 28" className={box} aria-hidden>
        <rect className="js-bar" x="0" y="6" width="70" height="5" rx="2.5" fill="currentColor" opacity="0.25" style={{ ...fill, transformOrigin: "left" }} />
        <rect className="js-bar js-bar-after" x="0" y="17" width="42" height="5" rx="2.5" fill={LIME} style={{ ...fill, transformOrigin: "left" }} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 70 28" className={box} aria-hidden>
      <path
        className="js-path"
        d="M 4 22 C 18 22, 22 8, 40 8 S 54 8, 66 8"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1"
      />
      <circle className="js-node" cx="4" cy="22" r="3.5" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" style={{ ...fill, transformOrigin: "center" }} />
      <circle className="js-node" cx="40" cy="8" r="3.5" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" style={{ ...fill, transformOrigin: "center" }} />
      <circle className="js-node" cx="66" cy="8" r="4" fill={LIME} style={{ ...fill, transformOrigin: "center" }} />
    </svg>
  );
}

const ExperienceCard = ({
  number,
  label,
  kind,
}: {
  number: string;
  label: string[];
  kind: Kind;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    gsap.set(el, { transformPerspective: 800 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      ry(((x / r.width) - 0.5) * 8);
      rx(-((y / r.height) - 0.5) * 8);
    };

    const leave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="js-card group relative flex h-[230px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#0f0f0f] border border-neutral-800/80 p-6 text-white will-change-transform transition-colors duration-300 hover:border-neutral-700"
    >
      {/* cursor flashlight glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), rgba(212,255,58,0.18), transparent 70%)",
        }}
      />

      {/* Top Header: Number and Mini Visual Separation */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="text-5xl font-semibold leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-[#d4ff3a] sm:text-6xl">
          <Odometer value={number} />
        </span>
        <div className="pt-1 text-neutral-400 opacity-90 transition-opacity group-hover:opacity-100">
          <Mark kind={kind} />
        </div>
      </div>

      {/* Bottom Label */}
      <div className="relative z-10 text-right">
        {label.map((text, i) => (
          <span
            key={i}
            className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 group-hover:text-neutral-200 transition-colors"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────── section ───────────────────────── */

const AboutWorkExperience = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".js-ch", { yPercent: 115 });
        gsap.set(".js-label, .js-aside", { autoAlpha: 0, y: 14 });
        gsap.set(".js-arrow", { scale: 0, rotation: -45 });
        gsap.set(".js-card", { autoAlpha: 0, y: 35 });

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });

        tl.to(".js-label", { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
          .to(".js-ch", { yPercent: 0, duration: 1.2, stagger: 0.05 }, 0.05)
          .to(".js-arrow", { scale: 1, rotation: 0, duration: 0.9, ease: "back.out(2)" }, 0.45)
          .to(".js-aside", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.6)
          .to(".js-card", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.2)
          .set(".js-mask", { overflow: "visible" });

        gsap.utils.toArray<HTMLElement>(".js-card").forEach((card, i) => {
          const q = gsap.utils.selector(card);
          const at = 0.5 + i * 0.1;

          q(".js-reel").forEach((reel, k) => {
            const d = Number((reel as HTMLElement).dataset.d);
            tl.fromTo(
              reel,
              { yPercent: 0 },
              { yPercent: -(10 + d) * 5, duration: 1.6 + k * 0.15, ease: "expo.out" },
              at
            );
          });

          q(".js-scr").forEach((el) => {
            const finalChar = (el as HTMLElement).dataset.final || "";
            const o = { p: 0 };
            tl.to(
              o,
              {
                p: 1,
                duration: 1,
                ease: "none",
                onUpdate: () => {
                  el.textContent =
                    o.p > 0.85
                      ? finalChar
                      : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
                },
                onComplete: () => {
                  el.textContent = finalChar;
                },
              },
              at
            );
          });

          if (q(".js-tick").length)
            tl.fromTo(q(".js-tick"), { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: 0.03 }, at + 0.1);
          if (q(".js-bar").length)
            tl.fromTo(q(".js-bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.2 }, at + 0.15);
          if (q(".js-path").length)
            tl.fromTo(q(".js-path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, at + 0.1);
          if (q(".js-node").length)
            tl.fromTo(
              q(".js-node"),
              { scale: 0 },
              { scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2)" },
              at + 0.3
            );
        });

        gsap.fromTo(
          ".js-pulse",
          { scale: 1, opacity: 0.9 },
          { scale: 2.2, opacity: 0, duration: 1.6, ease: "power2.out", repeat: -1, delay: 2 }
        );

        gsap.to(".js-arrow-icon", {
          x: 4,
          duration: 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".js-reel").forEach((reel) => {
          gsap.set(reel, { yPercent: -(10 + Number(reel.dataset.d)) * 5 });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:items-center lg:gap-16"
    >
      {/* Heading Left */}
      <div className="shrink-0">
        <p className="js-label mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          <span className="h-2 w-2 rounded-full bg-[#d4ff3a] ring-2 ring-[#d4ff3a]/20" />
          01 / Profile
        </p>

        <div className="flex items-center gap-4">
          <h1
            aria-label="About"
            className="select-none text-6xl font-black leading-none tracking-[-0.05em] text-neutral-900 sm:text-7xl md:text-8xl"
          >
            <span className="js-mask -my-[0.06em] block overflow-hidden py-[0.06em]">
              {"About".split("").map((c, i) => (
                <span key={i} aria-hidden className="js-ch inline-block will-change-transform">
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <span className="js-arrow grid h-14 w-14 shrink-0 place-items-center rounded-full border border-neutral-900 text-neutral-900 transition-colors duration-300 hover:bg-[#d4ff3a] hover:border-[#d4ff3a]">
            <FaArrowRight size={20} className="js-arrow-icon" />
          </span>
        </div>

        <p className="js-aside mt-4 font-serif italic text-2xl text-neutral-600 sm:text-3xl">
          me, in numbers.
        </p>
      </div>

      {/* 4 Clean Metric Cards Grid */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:w-[65%]">
        {EXPERIENCE_STATS.map((stat, index) => (
          <ExperienceCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default AboutWorkExperience;