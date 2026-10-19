import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERIF = "font-['Instrument_Serif',serif]";

const EDUCATION_DATA = [
  {
    number: "01",
    title: "Vikaasa",
    description:
      "Laid the foundation of my academic journey, where I developed curiosity, discipline, and a drive to learn beyond the classroom.",
    image: "/portfolio-v2/vikaasa.jpg",
  },
  {
    number: "02",
    title: "Cambridge",
    description:
      "Enhanced critical thinking and problem-solving skills through a globally recognized curriculum, building strong fundamentals for higher studies.",
    image: "/portfolio-v2/cambridge.webp",
  },
  {
    number: "03",
    title: "Ramco Institute of Technology",
    description:
      "Pursued my undergraduate degree, gaining hands-on experience in technology, software development, and teamwork while preparing for real-world challenges.",
    image: "/portfolio-v2/ramco.webp",
  },
];

// [word, highlighted?]  The highlighted words get a lime marker pulled across them.
const STATEMENT: [string, boolean][] = [
  ["From", false],
  ["concept", true],
  ["to", true],
  ["classroom,", true],
  ["I", false],
  ["build", false],
  ["learning", false],
  ["experiences", false],
  ["that", false],
  ["resonate", false],
  ["—", false],
  ["combining", false],
  ["structure,", true],
  ["creativity", true],
  ["and", false],
  ["real-world", false],
  ["relevance.", false],
];

// Words start pale on cream and settle as you read down the page
const SCRUB_FROM = "#cdc9bd";
const SCRUB_FINAL = "#4a4943";
const STATEMENT_FINAL = "#77746b";
const INK = "#0d0d0d";

const MARKER_STYLE: React.CSSProperties = {
  backgroundImage: "linear-gradient(#d4ff3a, #d4ff3a)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left bottom",
  backgroundSize: "100% 0.42em",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const ScrubWords = ({ text, final }: { text: string; final: string }) => (
  <>
    {text.split(" ").map((w, i) => (
      <React.Fragment key={i}>
        {i > 0 && " "}
        <span className="scrub-word inline-block" data-final={final}>
          {w}
        </span>
      </React.Fragment>
    ))}
  </>
);

// A word that rises out of a mask (extra bottom room so descenders aren't cut)
const MaskWord = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block overflow-hidden align-top pb-[0.2em] -mb-[0.2em]">
    <span className="mask-in inline-block will-change-transform">{children}</span>
  </span>
);

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

const Education = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Header ── */
        gsap.fromTo(
          ".edu-label, .edu-title",
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".edu-head", start: "top 85%", once: true },
          }
        );

        // the statement is "read" as the header passes...
        gsap.fromTo(
          ".stmt .scrub-word",
          { color: SCRUB_FROM },
          {
            color: (_i: number, el: HTMLElement) => el.dataset.final as string,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ".stmt",
              start: "top 88%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );

        // ...and the key words get underlined with a lime marker
        gsap.fromTo(
          ".mk",
          { backgroundSize: "0% 0.42em" },
          {
            backgroundSize: "100% 0.42em",
            duration: 1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ".stmt", start: "top 70%", once: true },
          }
        );

        /* ── Rows ── */
        gsap.utils.toArray<HTMLElement>(".edu-row").forEach((row) => {
          const q = gsap.utils.selector(row);

          gsap.set(q(".curtain"), { transformOrigin: "50% 100%" });

          // number, title words, then the lime curtain pulls down off the image
          gsap
            .timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: { trigger: row, start: "top 72%", once: true },
            })
            .fromTo(q(".num-in"), { yPercent: 110 }, { yPercent: 0, duration: 1.2 }, 0)
            .fromTo(q(".mask-in"), { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.06 }, 0.1)
            .fromTo(
              q(".curtain"),
              { scaleY: 1 },
              { scaleY: 0, duration: 1.3, ease: "expo.inOut" },
              0.15
            )
            .fromTo(
              q(".img-in"),
              { scale: 1.3 },
              { scale: 1, duration: 1.8, clearProps: "transform" }, // hand hover-zoom back to CSS
              0.15
            );

          // description is "read" as you scroll past it
          gsap.fromTo(
            q(".desc .scrub-word"),
            { color: SCRUB_FROM },
            {
              color: (_i: number, el: HTMLElement) => el.dataset.final as string,
              ease: "none",
              stagger: 0.08,
              scrollTrigger: {
                trigger: q(".desc")[0],
                start: "top 88%",
                end: "bottom 62%",
                scrub: true,
              },
            }
          );

          // the photo drifts inside its frame
          gsap.fromTo(
            q(".par"),
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: q(".img-frame")[0],
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });

      /* Desktop: each row is a page laid over the last. As the next one slides up,
         the one beneath sinks back and fades. */
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(".edu-row");
        rows.slice(0, -1).forEach((row, i) => {
          gsap.to(row.querySelector(".row-in"), {
            scale: 0.94,
            opacity: 0.25,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: {
              trigger: rows[i + 1],
              start: "top 70%",
              end: "top 8%",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative w-full bg-[#f1efe9] text-[#0d0d0d]">
      {/* Header Section */}
      <div className="edu-head mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:px-12">
        <div>
          <p className="edu-label mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d0d0d]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff3a] ring-1 ring-black/30" />
            03 / Education
          </p>
          <h3 className="edu-title text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
            Education
          </h3>
        </div>

        <h4 className="stmt w-full text-right text-lg font-semibold leading-snug tracking-tight md:w-1/2 md:text-2xl md:leading-normal lg:text-3xl">
          {STATEMENT.map(([w, hl], i) => (
            <React.Fragment key={i}>
              {i > 0 && " "}
              <span
                className={`scrub-word inline-block ${hl ? "mk -mr-[0.28em] pr-[0.28em]" : ""}`}
                data-final={hl ? INK : STATEMENT_FINAL}
                style={hl ? MARKER_STYLE : undefined}
              >
                {w}
              </span>
            </React.Fragment>
          ))}
        </h4>
      </div>

      {/* Education List: stacked pages on desktop */}
      <div className="flex flex-col">
        {EDUCATION_DATA.map((edu, index) => (
          <div
            key={index}
            className={`edu-row group/row relative border-t border-[#0d0d0d]/15 bg-[#f1efe9] md:sticky md:top-16 md:flex md:min-h-[62vh] md:items-center ${
              index > 0 ? "md:shadow-[0_-30px_60px_-34px_rgba(13,13,13,0.35)]" : ""
            }`}
          >
            <div className="row-in mx-auto flex w-full max-w-[1400px] flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:px-12 md:py-14">
              {/* Number */}
              <div className="w-full md:w-1/5">
                <div className="overflow-hidden pb-[0.12em]">
                  <p
                    className={`num-in flex items-baseline gap-2 leading-none  `}
                  >
                    <span className="text-[clamp(4.5rem,9vw,8.5rem)] tracking-[-0.02em]">
                      {edu.number}
                    </span>
                    <span className="font-mono text-[11px] not-italic tracking-[0.2em] text-[#0d0d0d]/45">
                      /{String(EDUCATION_DATA.length).padStart(2, "0")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/3">
                <h6 className="mb-3 w-fit bg-[linear-gradient(#d4ff3a,#d4ff3a)] bg-[length:0%_0.38em] bg-left-bottom bg-no-repeat text-2xl font-semibold leading-tight tracking-tight transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:bg-[length:100%_0.38em] md:text-3xl">
                  {edu.title.split(" ").map((w, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && " "}
                      <MaskWord>{w}</MaskWord>
                    </React.Fragment>
                  ))}
                </h6>
                <p className="desc text-sm leading-relaxed md:text-base">
                  <ScrubWords text={edu.description} final={SCRUB_FINAL} />
                </p>
              </div>

              {/* Image */}
              <div className="w-full md:w-2/5">
                <div className="img-frame group relative h-48 overflow-hidden rounded-xl shadow-md md:h-56 lg:h-64">
                  {/* photo sits taller than its frame so it can drift */}
                  <div className="par absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
                    <img
                      src={edu.image}
                      alt={edu.title}
                      loading="lazy"
                      className="img-in h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>

                  {/* lime curtain that pulls down off the photo */}
                  <span
                    aria-hidden
                    className="curtain pointer-events-none absolute inset-0 z-10 origin-bottom scale-y-0 bg-[#d4ff3a]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;