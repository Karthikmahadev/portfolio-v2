import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERIF = "font-['Instrument_Serif',serif]";
const CODE_SYMBOLS = "01{}[]<>/;=+*#";

/**
 * `tags` connect each tool to the phrases in the quote on the right.
 * Hover (or tap) a phrase and only the tools tagged with it stay lit.
 * Change the tags freely, it's just data.
 */
type Tag = "schema" | "api" | "interface" | "deploy" | "reliability";

const skills: { name: string; logo: string; tags: Tag[] }[] = [
  { name: "JavaScript", logo: "/portfolio-v2/js.png", tags: ["interface"] },
  { name: "TypeScript", logo: "/portfolio-v2/typescript.webp", tags: ["interface", "reliability"] },
  { name: "React", logo: "/portfolio-v2/react.png", tags: ["interface"] },
  { name: "Next.js", logo: "/portfolio-v2/next.png", tags: ["interface", "deploy"] },
  { name: "React Native", logo: "/portfolio-v2/react-native.webp", tags: ["interface", "deploy"] },
  { name: "Grafana", logo: "/portfolio-v2/grafana.webp", tags: ["reliability"] },
  { name: "Express", logo: "/portfolio-v2/express.png", tags: ["api"] },
  { name: "PostgreSQL", logo: "/portfolio-v2/postgresql.png", tags: ["schema"] },
  { name: "Algolia", logo: "/portfolio-v2/algolio.png", tags: ["schema"] },
  { name: "Node.js", logo: "/portfolio-v2/nodejs.png", tags: ["api"] },
  { name: "Supabase", logo: "/portfolio-v2/supabase.webp", tags: ["schema", "api"] },
  { name: "Git", logo: "/portfolio-v2/git.webp", tags: ["deploy", "reliability"] },
];

type Piece = string | { key: Tag; text: string };

const QUOTE: Piece[] = [
  "I enjoy owning a feature from ",
  { key: "schema", text: "database schema" },
  " and ",
  { key: "api", text: "API design" },
  " all the way to the ",
  { key: "interface", text: "interface" },
  ", ",
  { key: "deploy", text: "deployment" },
  ", and ",
  { key: "reliability", text: "production reliability" },
  ".",
];

const QUOTE_FROM = "#55534c";
const QUOTE_FINAL = "#f1efe9";

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

/** Plain quote text, word by word, so it can be "read" while scrolling. */
const QuoteWords = ({ text }: { text: string }) => (
  <>
    {text.split(/(\s+)/).map((p, i) =>
      /^\s+$/.test(p) || p === "" ? (
        p
      ) : (
        <span key={i} className="scrub-word inline-block" data-final={QUOTE_FINAL}>
          {p}
        </span>
      )
    )}
  </>
);

const Tile = ({
  name,
  logo,
  index,
  dim,
  lit,
}: {
  name: string;
  logo: string;
  index: number;
  dim: boolean;
  lit: boolean;
}) => {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onPointerMove={onMove}
      className={`tile group relative flex h-32 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#0d0d0d]/40 hover:shadow-md sm:h-36 ${
        dim ? "opacity-25 grayscale" : "opacity-100"
      } ${lit ? "border-[#0d0d0d] ring-2 ring-[#d4ff3a]" : "border-[#0d0d0d]/10"}`}
    >
      {/* cursor lamp */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle 110px at var(--mx, 50%) var(--my, 50%), rgba(212,255,58,0.5), transparent 70%)",
        }}
      />

      <span className="absolute left-3 top-2.5 font-mono text-[10px] tracking-[0.12em] text-[#0d0d0d]/35">
        {String(index + 1).padStart(2, "0")}
      </span>

      <img
        src={logo}
        alt={name}
        className={`relative max-h-12 max-w-[70%] object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 sm:max-h-14 ${
          lit ? "scale-110" : ""
        }`}
      />

      <span className="absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0d0d0d]/45 transition-colors duration-300 group-hover:text-[#0d0d0d]">
        {name}
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

const Skills = () => {
  const root = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState<Tag | null>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Heading ── */
        const head = { trigger: ".sk-head", start: "top 85%", once: true };

        gsap.fromTo(
          ".sk-label",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: head }
        );
        gsap.fromTo(
          ".line-in",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.14, scrollTrigger: head }
        );

        // the "Code" chip pops in, then its letters resolve out of code symbols
        gsap.fromTo(
          ".chip",
          { scale: 0, rotation: -14 },
          {
            scale: 1,
            rotation: -2,
            duration: 0.9,
            ease: "back.out(2.4)",
            delay: 0.45,
            scrollTrigger: head,
          }
        );
        const chipText = section.querySelector<HTMLElement>(".chip-text");
        if (chipText) {
          const final = chipText.dataset.final || "";
          const o = { p: 0 };
          gsap.to(o, {
            p: 1,
            duration: 1.2,
            delay: 0.55,
            ease: "none",
            scrollTrigger: head,
            onUpdate: () => {
              chipText.textContent = final
                .split("")
                .map((c, i) =>
                  o.p > ((i + 1) / final.length) * 0.8 + 0.15
                    ? c
                    : CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)]
                )
                .join("");
            },
            onComplete: () => {
              chipText.textContent = final;
            },
          });
        }

        /* ── Tiles drop in like blocks being stacked, in random order ── */
        const tiles = gsap.utils.toArray<HTMLElement>(".tile");
        const order = gsap.utils.shuffle(tiles.map((_, i) => i));
        const grid = { trigger: ".sk-grid", start: "top 85%", once: true };

        gsap.fromTo(
          tiles,
          { y: -140, rotation: (i: number) => (i % 2 ? 1 : -1) * gsap.utils.random(6, 14) },
          {
            y: 0,
            rotation: 0,
            duration: 1.3,
            ease: "bounce.out",
            delay: (i: number) => order[i] * 0.055,
            clearProps: "transform", // hand hover-lift back to CSS
            scrollTrigger: grid,
          }
        );
        gsap.fromTo(
          tiles,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.35,
            delay: (i: number) => order[i] * 0.055,
            clearProps: "opacity,visibility", // hand dimming back to CSS
            scrollTrigger: grid,
          }
        );

        /* ── Quote card: wipes up, then the words are "read" as you scroll ── */
        gsap.fromTo(
          ".quote-card",
          { clipPath: "inset(100% 0% 0% 0% round 16px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            duration: 1.3,
            ease: "expo.inOut",
            clearProps: "clipPath",
            scrollTrigger: { trigger: ".quote-card", start: "top 88%", once: true },
          }
        );
        gsap.fromTo(
          ".q-mark",
          { yPercent: 40, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.4,
            ease: "expo.out",
            delay: 0.3,
            scrollTrigger: { trigger: ".quote-card", start: "top 88%", once: true },
          }
        );
        gsap.fromTo(
          ".quote .scrub-word",
          { color: QUOTE_FROM },
          {
            color: (_i: number, el: HTMLElement) => el.dataset.final as string,
            ease: "none",
            stagger: 0.07,
            scrollTrigger: {
              trigger: ".quote",
              start: "top 85%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const onCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={root}
      className="relative bg-[#f1efe9] px-6 py-16 text-[#0d0d0d] sm:px-8 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="sk-head mb-10 md:mb-14">
          <p className="sk-label mb-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d0d0d]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff3a] ring-1 ring-black/30" />
            04 / Stack
            <span className={`text-base normal-case italic tracking-normal ${SERIF}`}>
              ({String(skills.length).padStart(2, "0")})
            </span>
          </p>

          <h1 className="text-left text-4xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block -my-[0.1em] overflow-hidden py-[0.1em]">
              <span className="line-in block will-change-transform">
                Built on{" "}
                <span
                  className="chip inline-block -rotate-2 rounded-md bg-[#d4ff3a] px-3 py-1 align-middle font-mono text-xl font-bold tracking-normal sm:text-2xl md:text-3xl"
                  aria-label="Code"
                >
                  <span aria-hidden className="chip-text inline-block min-w-[4ch] text-center" data-final="Code">
                    Code
                  </span>
                </span>
              </span>
            </span>
            <span className="block -my-[0.1em] overflow-hidden py-[0.1em]">
              <span className="line-in block will-change-transform">
                Driven by{" "}
                <em className={`text-[1.12em] font-normal italic tracking-normal ${SERIF}`}>
                  Vision
                </em>
              </span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Skills Grid */}
          <div className="sk-grid grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {skills.map((skill, idx) => {
              const matches = focus ? skill.tags.includes(focus) : false;
              return (
                <Tile
                  key={idx}
                  name={skill.name}
                  logo={skill.logo}
                  index={idx}
                  dim={!!focus && !matches}
                  lit={matches}
                />
              );
            })}
          </div>

          {/* Quote Section */}
          <div
            onPointerMove={onCardMove}
            className="quote-card relative flex-1 overflow-hidden rounded-2xl bg-[#121212] p-8 text-white md:p-12"
          >
            {/* cursor lamp */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle 240px at var(--mx, 75%) var(--my, 15%), rgba(212,255,58,0.14), transparent 70%)",
              }}
            />

            <span
              aria-hidden
              className={`q-mark pointer-events-none absolute -left-1 -top-8 select-none text-[11rem] italic leading-none text-[#d4ff3a] ${SERIF}`}
            >
              &ldquo;
            </span>

            <p className="quote relative max-w-4xl pt-14 text-2xl font-medium leading-tight md:text-4xl">
              {QUOTE.map((piece, i) =>
                typeof piece === "string" ? (
                  <QuoteWords key={i} text={piece} />
                ) : (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={focus === piece.key}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setFocus(piece.key)}
                    onPointerLeave={(e) => e.pointerType === "mouse" && setFocus(null)}
                    onClick={(e) => {
                      // touch and keyboard toggle; mouse already reacts to hover
                      if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") {
                        setFocus((f) => (f === piece.key ? null : piece.key));
                      }
                    }}
                    className={`rounded-sm border-b border-dashed px-0.5 text-[1.08em] italic transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4ff3a] ${SERIF} ${
                      focus === piece.key
                        ? "border-transparent bg-[#d4ff3a] text-[#0d0d0d]"
                        : "border-[#d4ff3a]/60 text-[#d4ff3a]"
                    }`}
                  >
                    {piece.text}
                  </button>
                )
              )}
            </p>

            <p className="relative mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff3a]" />
              Hover or tap a phrase to light up the stack
            </p>

            <div className="relative mt-8">
              <strong className="block font-semibold">Karthik Mahadev</strong>

              <span className="text-sm text-gray-400">Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;