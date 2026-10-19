import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuCopy, LuCheck, LuArrowUpRight } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ───────────────────────── content ───────────────────────── */

const EMAIL = "karthikmahadev2001@gmail.com";
const LOCATION = "Tamil Nadu, IN";
const STACK = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

const INTRO_1 =
  "Full Stack Developer with *2+ years* of experience building and shipping production web and mobile applications using *React*, *Next.js*, *TypeScript*, *Node.js*, and *PostgreSQL*.";
const INTRO_2 =
  "I enjoy owning features end-to-end — from database design and authentication to APIs, responsive interfaces, payments, testing, and production deployment.";

const SERIF = "font-['Instrument_Serif',serif]";

// If the preloader never reports back, play the intro anyway after this long.
const READY_FAILSAFE_MS = 8000;

/* ───────────────────────── helpers ───────────────────────── */

function parseWords(text) {
  let on = false;
  return text.split(" ").map((token) => {
    if (token.startsWith("*")) on = true;
    const em = on;
    if (token.lastIndexOf("*") > 0) on = false;
    return { w: token.replace(/\*/g, ""), em };
  });
}

function useMagnetic(ref, strength = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - (gsap.getProperty(el, "x") || 0);
      const cy = r.top + r.height / 2 - (gsap.getProperty(el, "y") || 0);
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

/* ───────────────────────── pieces ───────────────────────── */

/**
 * FIX 1: the mask used to be exactly one line-box tall (line-height .88 + 4px),
 * so on some fonts the glyphs sat partly or wholly outside it and were clipped.
 * Hovering lifted letters by a few px, which is why they "appeared" with the
 * cursor. The mask now has generous vertical room (0.14em top and bottom,
 * cancelled out with a negative margin so the layout doesn't move), and it is
 * switched to overflow: visible once the intro has finished.
 */
function NameLine({ text, lineClass }) {
  return (
    <span className="js-hero-mask -my-[0.14em] block overflow-hidden py-[0.14em]">
      <span className={`block leading-[0.88] ${lineClass}`}>
        {text.split("").map((c, i) => (
          <span key={i} className="js-hero-ch inline-block will-change-transform">
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

function PillLink({ href, children, solid = false }) {
  const ref = useRef(null);
  useMagnetic(ref, 0.25);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`js-pop group relative inline-flex overflow-hidden rounded-full border border-[#0d0d0d] px-5 py-2.5 text-sm font-medium ${
        solid ? "bg-[#0d0d0d] text-[#f1efe9]" : "text-[#0d0d0d]"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-full bg-[#d4ff3a] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      />
      <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
          <span className="flex h-[1.25em] items-center gap-1.5">
            {children}
            <LuArrowUpRight size={14} />
          </span>
          <span className="flex h-[1.25em] items-center gap-1.5 text-[#0d0d0d]">
            {children}
            <LuArrowUpRight size={14} />
          </span>
        </span>
      </span>
    </a>
  );
}

/* ───────────────────────── section ───────────────────────── */

/**
 * `ready` comes from App: it flips to true as the preloader starts opening.
 * FIX 2: the intro used to start on mount, i.e. while the preloader was still
 * covering the page, so it was already over (or half-done) by the time anyone
 * could see it. Now the first frame is set up immediately, but the timeline
 * waits for `ready`.
 */
const Myself = ({ ready = true }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const root = useRef(null);
  const nameRef = useRef(null);
  const photoRef = useRef(null);
  const introReady = useRef(false); // blocks the cursor wave until the intro settles
  const introTl = useRef(null);
  const readyRef = useRef(ready);
  useMagnetic(photoRef, 0.12);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    return () => clearTimeout(timer.current);
  }, []);

  // start the intro the moment the preloader says so
  useEffect(() => {
    readyRef.current = ready;
    if (ready) introTl.current?.play();
  }, [ready]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let failsafe;

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // first frame, set before anything is visible
        gsap.set(q(".js-hero-ch"), { yPercent: 115 });
        gsap.set(q(".js-iw"), { yPercent: 115 });
        gsap.set(q(".js-photo"), { autoAlpha: 0, scale: 0.6, rotate: -8 });
        gsap.set(q(".js-pop, .js-meta, .js-copy, .js-intro2, .js-ticker"), {
          autoAlpha: 0,
          y: 18,
        });

        const tl = gsap.timeline({
          paused: true, // waits for the preloader
          defaults: { ease: "expo.out" },
          onComplete: () => {
            // FIX 3: whatever happened above, leave the name in its natural
            // resting state: no leftover transform, and no mask to clip it
            gsap.set(q(".js-hero-ch"), { clearProps: "transform" });
            gsap.set(q(".js-hero-mask"), { overflow: "visible" });
            introReady.current = true; // now the cursor wave may run
          },
        });
        introTl.current = tl;

        tl.to(q(".js-hero-ch"), { yPercent: 0, duration: 1.2, stagger: 0.035 }, 0.1)
          .to(q(".js-meta"), { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2)
          .to(
            q(".js-photo"),
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.3, ease: "elastic.out(1, 0.75)" },
            0.35
          )
          .to(q(".js-iw"), { yPercent: 0, duration: 0.9, stagger: 0.015 }, 0.55)
          .to(q(".js-copy"), { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
          .to(q(".js-pop"), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 }, 0.8)
          .to(q(".js-intro2"), { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
          .to(q(".js-ticker"), { autoAlpha: 1, y: 0, duration: 0.8 }, 1.05);

        // the preloader may already have reported ready before we got here
        if (readyRef.current) tl.play();
        // and if it never does, don't leave the page blank
        failsafe = setTimeout(() => tl.play(), READY_FAILSAFE_MS);

        // Scroll separation: clean sub-pixel displacement
        const scrub = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        };
        gsap.to(q(".js-l1"), { xPercent: -6, ease: "none", scrollTrigger: scrub });
        gsap.to(q(".js-l2"), { xPercent: 6, ease: "none", scrollTrigger: scrub });

        // Ticker and ring rotation
        gsap.to(q(".js-badge"), {
          rotation: 360,
          duration: 22,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
        gsap.to(q(".js-marquee"), { xPercent: -50, duration: 34, ease: "none", repeat: -1 });
      });

      /* ── Pointer Interactions ── */
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = root.current;
          const name = nameRef.current;
          const lamp = section?.querySelector(".js-lamp");
          const chars = q(".js-hero-ch");

          if (!lamp || !name || !section) return;

          const pos = { x: section.clientWidth * 0.7, y: section.clientHeight * 0.3 };
          const apply = () => {
            lamp.style.setProperty("--mx", `${pos.x}px`);
            lamp.style.setProperty("--my", `${pos.y}px`);
          };
          apply();

          const onSection = (e) => {
            const r = section.getBoundingClientRect();
            gsap.to(pos, {
              x: e.clientX - r.left,
              y: e.clientY - r.top,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: apply,
            });
          };

          const onName = (e) => {
            if (!introReady.current) return; // never fight the intro

            chars.forEach((c) => {
              const r = c.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2 - (gsap.getProperty(c, "y") || 0);
              const dx = e.clientX - cx;
              const d = Math.hypot(dx, e.clientY - cy);
              const p = Math.max(0, 1 - d / 190);
              gsap.to(c, {
                y: -p * 24,
                skewX: p * (dx > 0 ? -10 : 10),
                duration: 0.4,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          };

          const onLeave = () => {
            if (!introReady.current) return;
            gsap.to(chars, {
              y: 0,
              skewX: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              stagger: 0.015,
              overwrite: "auto",
            });
          };

          section.addEventListener("pointermove", onSection);
          name.addEventListener("pointermove", onName);
          name.addEventListener("pointerleave", onLeave);

          return () => {
            section.removeEventListener("pointermove", onSection);
            name.removeEventListener("pointermove", onName);
            name.removeEventListener("pointerleave", onLeave);
          };
        }
      );

      return () => {
        clearTimeout(failsafe);
        introTl.current = null;
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#f1efe9] text-[#0d0d0d]"
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="js-lamp pointer-events-none absolute inset-0"
        style={{
          "--mx": "70%",
          "--my": "30%",
          background:
            "radial-gradient(circle 34vmax at var(--mx) var(--my), rgba(212,255,58,0.42), rgba(212,255,58,0) 70%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-10 p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Meta row */}
        <div className="js-meta flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0d0d0d] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0d0d0d]" />
            </span>
            Portfolio &rsquo;26
          </span>
          <span className="text-[#0d0d0d]/60">
            {LOCATION} · <Clock /> IST
          </span>
        </div>

        {/* Top Section */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-start md:gap-12">
          {/* Name */}
          <h1
            ref={nameRef}
            aria-label="Karthik Mahadev"
            className="select-none text-[clamp(3.5rem,11.5vw,12rem)] font-bold uppercase leading-[0.88] tracking-[-0.06em]"
          >
            <NameLine text="Karthik" lineClass="js-l1" />
            <NameLine text="Mahadev" lineClass="js-l2" />
          </h1>

          {/* Profile image in a rotating ring */}
          <div
            ref={photoRef}
            className="js-photo relative h-36 w-36 shrink-0 sm:h-44 sm:w-44 md:h-[210px] md:w-[210px]"
          >
            <svg viewBox="0 0 200 200" className="js-badge absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path
                  id="badge-circle"
                  d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                />
              </defs>
              <text fontSize="11.5" fontWeight="600" letterSpacing="2.4" fill="currentColor">
                <textPath href="#badge-circle" textLength="508" lengthAdjust="spacing">
                  FULL STACK DEVELOPER • REACT • NEXT.JS • NODE.JS •
                </textPath>
              </text>
            </svg>

            <div className="group absolute inset-[11%] overflow-hidden rounded-full ring-1 ring-black/10">
              <img
                src="/portfolio-v2/profile-img.jpg"
                alt="Karthik Mahadev"
                className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>

            {/* 2+ Years Badge */}
            <span className="absolute -bottom-1 -left-2 grid h-14 w-14 -rotate-12 place-items-center rounded-full bg-[#d4ff3a] text-center leading-none shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)]">
              <span>
                <span className="block text-lg font-bold tracking-tight">2+</span>
                <span className="block text-[8px] font-semibold uppercase tracking-[0.15em]">
                  years
                </span>
              </span>
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start justify-between gap-8 pt-4 lg:flex-row lg:items-end lg:gap-12">
          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="js-copy font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d0d0d]/50">
              Say hello
            </p>

            <button
              onClick={handleCopy}
              aria-label={`Copy email address ${EMAIL}`}
              className="js-copy group relative -mt-1 flex items-center gap-3 text-left text-base font-medium sm:text-lg md:text-xl"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
                {EMAIL}
              </span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#0d0d0d]/30 transition-colors duration-300 group-hover:bg-[#d4ff3a]">
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
              </span>

              <span
                aria-live="polite"
                className={`pointer-events-none absolute -top-8 left-0 rounded-full bg-[#d4ff3a] px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                  copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {copied ? "Copied to clipboard" : ""}
              </span>
            </button>

            <div className="flex flex-wrap gap-2.5">
              <PillLink href="https://github.com/Karthikmahadev">GitHub</PillLink>
              <PillLink href="https://www.linkedin.com/in/karthikmahadev19">LinkedIn</PillLink>
              <PillLink
                solid
                href="/portfolio-v2/Karthik_Mahadev_B_Resume.pdf"
              >
                Resume
              </PillLink>
            </div>
          </div>

          {/* Introduction */}
          <div className="w-full lg:w-[55%] xl:w-[48%]">
            <p className="text-xl font-bold leading-[1.15] tracking-tight sm:text-2xl md:text-3xl lg:text-[30px]">
              {parseWords(INTRO_1).map((x, i) => (
                <React.Fragment key={i}>
                  <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom">
                    <span
                      className={`js-iw inline-block will-change-transform ${
                        x.em ? `${SERIF} text-[1.15em] font-normal italic tracking-normal` : ""
                      }`}
                    >
                      {x.w}
                    </span>
                  </span>{" "}
                </React.Fragment>
              ))}
            </p>

            <p className="js-intro2 mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
              {INTRO_2}
            </p>
          </div>
        </div>
      </div>

      {/* Stack ticker */}
      <div className="js-ticker relative z-10 overflow-hidden border-t border-[#0d0d0d]/15 py-3">
        <div className="js-marquee flex w-max">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center" aria-hidden={n === 1}>
              {[...STACK, ...STACK, ...STACK].map((s, i) => (
                <span key={i} className="flex items-center">
                  <span className={`${SERIF} px-8 text-2xl italic md:text-3xl`}>{s}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Myself;