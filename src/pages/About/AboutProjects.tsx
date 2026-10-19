import React, { useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ───────────────────────── data ───────────────────────── */

type Project = {
  title: string;
  category: string;
  period: string;
  stack: string;
  image: string;
  link: string;
  status: "LIVE" | "PRODUCTION" | "BUILT" | "COMING SOON";
  description: string;
  highlights: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Memora",
    category: "Photography Studio & Agency Platform",
    period: "Oct 2026 — Present",
    stack: "Next.js · TypeScript · Tailwind CSS · PostgreSQL · Vercel",
    image: "/portfolio-v2/memora.webp",
    link: "https://memora-sigma-seven.vercel.app/",
    status: "COMING SOON",
    description:
      "Building a high-end digital platform and portfolio for a professional photography studio and creative agency, emphasizing immersive gallery layouts, client booking workflows, and visual storytelling.",
    highlights: [
      "Immersive gallery layout design",
      "Modern Next.js App Router architecture",
      "Client booking & inquiry workflows",
      "Optimized responsive image delivery",
    ],
  },
  {
    title: "Dot Flavr",
    category: "Food Consultancy & Innovation Studio",
    period: "Oct 2026 — Present",
    stack: "Next.js · TypeScript · Tailwind CSS · GSAP · Vercel",
    image: "/portfolio-v2/dotflavr.png",
    link: "https://dot-flavr.vercel.app/",
    status: "LIVE",
    description:
      "Designed and built the website for a food consultancy and innovation studio: precision product development, formulation, shelf-life stability and industrial scale-up, alongside The Food Table community and learning lab.",
    highlights: [
      "Custom cream, burgundy and tangerine brand system",
      "GSAP ScrollTrigger + matchMedia animation system",
      "Pinned process rail with batch tracking",
      "LCP-optimised hero section",
      "Sticky FAQ accordion",
      "Multi-audience enquiry form",
    ],
  },
  {
    title: "Symmetra AI",
    category: "AI Chat Assistant with Tool Calling",
    period: "Personal Project",
    stack:
      "Next.js · TypeScript · NextAuth · PostgreSQL · Drizzle ORM · Google Gemini · Tailwind CSS · shadcn/ui",
    image: "/portfolio-v2/symmetra.jpg",
    link: "https://symmetra-ai.vercel.app/",
    status: "LIVE",
    description:
      "An AI assistant built on Google Gemini that shows LLM tool calling, real-time responses, OAuth sign-in and persistent chat history, with a sidebar that loads each user's conversations from the database.",
    highlights: [
      "Google OAuth with NextAuth",
      "Tool routing: weather, F1 and stock prices",
      "AI-generated chat titles",
      "Persistent chats with Drizzle ORM",
      "Server Actions + dynamic sidebar",
      "Modular AI layer",
    ],
  },
  {
    title: "The Relish Jar",
    category: "Production E-Commerce Platform",
    period: "Aug 2026 — Sept 2026",
    stack: "Next.js · TypeScript · Tailwind CSS · Supabase · PostgreSQL · Razorpay · Vercel",
    image: "/portfolio-v2/relishjar.jpg",
    link: "https://www.therelishjar.in/",
    status: "LIVE",
    description:
      "Built and deployed a production e-commerce platform end-to-end for Kridhan's Enterprises, owning requirements, UI, database architecture, payments, admin workflows, and deployment.",
    highlights: [
      "PostgreSQL + Row-Level Security",
      "Razorpay payment integration",
      "Authenticated admin dashboard",
      "Transactional email notifications",
      "GitHub CI/CD + Vercel",
    ],
  },
  {
    title: "BB FleetTracker",
    category: "Live GPS Fleet-Tracking Platform",
    period: "Dec 2025 — Jul 2026",
    stack: "Next.js · TypeScript · React Native · Expo · Supabase · PostgreSQL · DigitalOcean",
    image: "/portfolio-v2/fleettracker.png",
    link: "https://fleet.binarybudds.com/",
    status: "PRODUCTION",
    description:
      "Built and shipped a multi-tenant GPS fleet-tracking SaaS connecting drivers, parents, and school administrators across multiple schools.",
    highlights: [
      "JWT authentication + RBAC",
      "School-level Row-Level Security",
      "React Native / Expo apps",
      "Google Play Store deployment",
      "Sentry + Grafana observability",
      "Playwright testing in CI",
    ],
  },
  {
    title: "Origa.market",
    category: "Production B2B E-Commerce Platform",
    period: "Jun 2024 — Sep 2025",
    stack: "React.js · Tailwind CSS · Bootstrap · GraphQL · Algolia · PhonePe",
    image: "/portfolio-v2/origa.webp",
    link: "https://www.linkedin.com/company/origaleasefinance/posts",
    status: "PRODUCTION",
    description:
      "Developed and optimized a production-scale B2B e-commerce frontend covering product discovery, catalog, cart, checkout, payments, and transactional workflows.",
    highlights: [
      "Guest + authenticated cart",
      "PhonePe payment workflows",
      "Algolia product search",
      "35–40% page-load improvement",
      "Improved Core Web Vitals",
      "Expanded Jest test coverage",
    ],
  },
  {
    title: "FinSight",
    category: "Full Stack Financial Analytics Platform",
    period: "Personal Project",
    stack: "Next.js · Node.js · PostgreSQL · JWT",
    image: "/portfolio-v2/finsight.jpg",
    link: "https://finsight-frontend-imo3.onrender.com/",
    status: "BUILT",
    description:
      "Built a full-stack expense analytics platform for categorizing transactions, analyzing spending patterns, and generating actionable financial insights.",
    highlights: [
      "JWT-based authentication",
      "Per-user data isolation",
      "PostgreSQL database architecture",
      "Transaction categorization",
      "Spending analysis",
      "Production deployment",
    ],
  },
];

/* ───────────────────────── tuning ───────────────────────── */

const SERIF = "font-['Instrument_Serif',serif]";
const SCRUB_FROM = "#cdc9bd";
const SCRUB_FINAL = "#3b3b37";

const SCROLL_PER = 0.9;
const HOLD = 0.4;
const DUR = 0.8;
const CLOSED = "inset(24% 22% 24% 22% round 24px)";
const OPEN = "inset(0% 0% 0% 0% round 16px)";

const N = PROJECTS.length;
const pad = (n: number) => String(n).padStart(2, "0");
const startOf = (i: number) => HOLD + (i - 1) * 1.1;

/* ───────────────────────── helpers ───────────────────────── */

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

const Shot = ({ src, title }: { src: string; title: string }) => {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center p-8 text-center">
        <span className={`${SERIF} text-[clamp(2.4rem,6vw,5rem)] italic leading-none text-[#0d0d0d]/80`}>
          {title}
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${title} project preview`}
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-contain p-6 sm:p-8"
    />
  );
};

const StatusChip = ({ status }: { status: Project["status"] }) => (
  <span className="inline-flex items-center rounded-full bg-[#0d0d0d] px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#f1efe9]">
    {status !== "BUILT" && status !== "COMING SOON" && (
      <span className="relative mr-2 flex h-1.5 w-1.5">
        {status === "LIVE" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4ff3a] opacity-70 motion-reduce:animate-none" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4ff3a]" />
      </span>
    )}
    {status === "COMING SOON" && (
      <span className="relative mr-2 inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
    )}
    {status}
  </span>
);

const dotted =
  "bg-white bg-[radial-gradient(rgba(13,13,13,0.09)_1px,transparent_1px)] [background-size:16px_16px]";

const Corners = () => (
  <>
    {[
      "left-3 top-3 border-l-2 border-t-2",
      "right-3 top-3 border-r-2 border-t-2",
      "bottom-3 left-3 border-b-2 border-l-2",
      "bottom-3 right-3 border-b-2 border-r-2",
    ].map((c) => (
      <span
        key={c}
        aria-hidden
        className={`pointer-events-none absolute h-3.5 w-3.5 border-[#0d0d0d]/35 ${c}`}
      />
    ))}
  </>
);

const MobileCard = ({ p, i }: { p: Project; i: number }) => (
  <article className="w-[84vw] max-w-[28rem] shrink-0 snap-start">
    <div className={`relative h-[210px] overflow-hidden rounded-2xl border border-[#0d0d0d]/10 ${dotted}`}>
      <Shot src={p.image} title={p.title} />
      <Corners />
      <div className="absolute left-5 top-5">
        <StatusChip status={p.status} />
      </div>
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${p.title}`}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#0d0d0d]/20 bg-white text-[#0d0d0d] transition-colors hover:bg-[#d4ff3a]"
      >
        <LuArrowUpRight size={17} />
      </a>
    </div>

    <div className="pt-5">
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0d0d0d]/55">
        <span>{pad(i + 1)}/{pad(N)}</span>
        <span className="h-px w-8 bg-[#0d0d0d]/25" />
        <span>{p.period}</span>
      </p>
      <h3 className="mt-3 text-3xl font-semibold leading-none tracking-[-0.04em]">{p.title}</h3>
      <p className={`mt-2 text-xl italic text-[#0d0d0d]/65 ${SERIF}`}>{p.category}</p>
      <p className="mt-4 text-sm leading-relaxed text-[#3b3b37]">{p.description}</p>
      <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-[#0d0d0d]/75">
        <span className="text-[#0d0d0d]/45">Stack · </span>
        {p.stack}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full border border-[#0d0d0d]/15 bg-white/60 px-3 py-1.5 text-xs text-[#0d0d0d]/75"
          >
            {h}
          </span>
        ))}
      </div>
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 bg-[linear-gradient(#d4ff3a,#d4ff3a)] bg-[length:100%_0.3em] bg-bottom bg-no-repeat pb-0.5 text-sm font-semibold"
      >
        View project <LuArrowUpRight size={15} />
      </a>
    </div>
  </article>
);

/* ───────────────────────── section ───────────────────────── */

const AboutProjects = () => {
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const goTo = (i: number) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;
    const labelTime = tl.labels[`p${i}`] ?? 0;
    const targetScroll = st.start + (labelTime / tl.duration()) * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      /* ── Header ── */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".line-in",
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ".proj-head", start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          ".head-desc .scrub-word",
          { color: SCRUB_FROM },
          {
            color: (_i: number, el: HTMLElement) => el.dataset.final as string,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ".head-desc",
              start: "top 85%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );
      });

      /* ── Desktop: pinned projector ── */
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        if (N < 2) return;
        const pin = section.querySelector<HTMLElement>(".d-pin");
        if (!pin) return;

        const layers = q(".d-layer") as HTMLElement[];
        const blocks = q(".d-block") as HTMLElement[];
        const dots = q(".d-dot") as HTMLElement[];
        const reel = q(".d-reel")[0];
        const prog = q(".d-prog")[0] as HTMLElement;
        const countEl = q(".d-count")[0];
        const nameEl = q(".d-name")[0];

        // 1. Initial State Setup: keep item 0 visible, hide all subsequent layers/blocks
        layers.forEach((l, i) => {
          gsap.set(l, { autoAlpha: i === 0 ? 1 : 0 });
          const clip = l.querySelector(".d-clip");
          if (clip) gsap.set(clip, { clipPath: i === 0 ? OPEN : CLOSED });
        });

        blocks.forEach((b, i) => {
          gsap.set(b, { autoAlpha: i === 0 ? 1 : 0 });
          if (i === 0) {
            gsap.set(b.querySelectorAll(".tm"), { yPercent: 0 });
            gsap.set(b.querySelectorAll(".tf"), { autoAlpha: 1, y: 0 });
          }
        });

        const sync = (t: number, progress: number) => {
          const idx = Math.min(N - 1, Math.max(0, Math.floor((t - HOLD + 0.3) / 1.1) + 1));
          prog.style.transform = `scaleX(${progress})`;
          if (idx === activeRef.current) return;
          activeRef.current = idx;
          countEl.textContent = pad(idx + 1);
          nameEl.textContent = PROJECTS[idx].title;
          dots.forEach((d, i) => (d.dataset.on = String(i === idx)));
        };

        const totalScrollDistance = window.innerHeight * N * SCROLL_PER;

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "proj-pin",
            trigger: pin,
            start: "top top",
            end: () => `+=${totalScrollDistance}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => sync(self.animation!.time(), self.progress),
          },
        });
        tlRef.current = tl;

        tl.addLabel("p0", 0);

        for (let i = 1; i < N; i++) {
          const s = startOf(i);
          const prevLayer = layers[i - 1];
          const nextLayer = layers[i];
          const prevBlock = blocks[i - 1];
          const nextBlock = blocks[i];

          tl.addLabel(`p${i}`, s + DUR)
            // Layer crossfade and clip entrance
            .fromTo(nextLayer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, s)
            .fromTo(
              nextLayer.querySelector(".d-clip"),
              { clipPath: CLOSED },
              { clipPath: OPEN, duration: DUR, ease: "power3.inOut" },
              s
            )
            .fromTo(
              nextLayer.querySelector(".d-inner"),
              { scale: 1.35 },
              { scale: 1, duration: DUR, ease: "power3.inOut" },
              s
            )
            .fromTo(
              prevLayer,
              { scale: 1, autoAlpha: 1 },
              { scale: 0.94, autoAlpha: 0, duration: DUR, ease: "power3.inOut" },
              s
            )
            // Outgoing text block
            .to(
              prevBlock.querySelectorAll(".tm"),
              { yPercent: -115, duration: 0.4, ease: "power2.in", stagger: 0.03 },
              s
            )
            .to(
              prevBlock.querySelectorAll(".tf"),
              { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" },
              s
            )
            .set(prevBlock, { autoAlpha: 0 }, s + 0.4)
            // Incoming text block
            .set(nextBlock, { autoAlpha: 1 }, s + 0.35)
            .fromTo(
              nextBlock.querySelectorAll(".tm"),
              { yPercent: 115 },
              { yPercent: 0, duration: 0.55, ease: "expo.out", stagger: 0.05 },
              s + 0.35
            )
            .fromTo(
              nextBlock.querySelectorAll(".tf"),
              { autoAlpha: 0, y: 15 },
              { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.04 },
              s + 0.4
            )
            // Reel translation
            .fromTo(
              reel,
              { yPercent: -((i - 1) / N) * 100 },
              { yPercent: -(i / N) * 100, duration: DUR, ease: "power3.inOut" },
              s
            );
        }

        tl.to({}, { duration: HOLD });

        let alive = true;
        document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

        return () => {
          alive = false;
          tlRef.current = null;
        };
      });

      /* ── Spotlight & Visit Bubble ── */
      mm.add(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = section.querySelector<HTMLElement>(".d-pin");
          const stage = section.querySelector<HTMLElement>(".d-stage");
          const lamp = section.querySelector<HTMLElement>(".d-lamp");
          const bub = section.querySelector<HTMLElement>(".d-bubble");
          if (!pin || !stage || !lamp || !bub) return;

          const pos = { x: pin.clientWidth * 0.7, y: pin.clientHeight * 0.3 };
          const apply = () => {
            lamp.style.setProperty("--mx", `${pos.x}px`);
            lamp.style.setProperty("--my", `${pos.y}px`);
          };
          apply();

          const onPin = (e: PointerEvent) => {
            const r = pin.getBoundingClientRect();
            gsap.to(pos, {
              x: e.clientX - r.left,
              y: e.clientY - r.top,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              onUpdate: apply,
            });
          };

          gsap.set(bub, { autoAlpha: 1, scale: 0, xPercent: -50, yPercent: -50 });
          const bx = gsap.quickTo(bub, "x", { duration: 0.4, ease: "power3" });
          const by = gsap.quickTo(bub, "y", { duration: 0.4, ease: "power3" });
          let shown = false;

          const show = (on: boolean) => {
            if (on === shown) return;
            shown = on;
            gsap.to(bub, {
              scale: on ? 1 : 0,
              duration: on ? 0.35 : 0.25,
              ease: on ? "back.out(1.7)" : "power2.in",
              overwrite: "auto",
            });
          };

          const onStage = (e: PointerEvent) => {
            const r = stage.getBoundingClientRect();
            bx(e.clientX - r.left);
            by(e.clientY - r.top);
            show(!(e.target as HTMLElement).closest("a"));
          };

          const onEnter = (e: PointerEvent) => {
            const r = stage.getBoundingClientRect();
            gsap.set(bub, { x: e.clientX - r.left, y: e.clientY - r.top });
          };

          const onLeave = () => show(false);
          const onClick = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest("a")) return;
            window.open(PROJECTS[activeRef.current].link, "_blank", "noopener,noreferrer");
          };

          pin.addEventListener("pointermove", onPin);
          stage.addEventListener("pointerenter", onEnter);
          stage.addEventListener("pointermove", onStage);
          stage.addEventListener("pointerleave", onLeave);
          stage.addEventListener("click", onClick);

          return () => {
            pin.removeEventListener("pointermove", onPin);
            stage.removeEventListener("pointerenter", onEnter);
            stage.removeEventListener("pointermove", onStage);
            stage.removeEventListener("pointerleave", onLeave);
            stage.removeEventListener("click", onClick);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative w-full overflow-x-clip bg-[#f1efe9] text-[#0d0d0d]"
    >
      {/* ───────────── Header ───────────── */}
      <div className="proj-head mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 pb-12 pt-16 sm:px-8 md:px-12 md:pb-16 md:pt-24 lg:flex-row">
        <div className="max-w-2xl">
          <p className="mb-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d0d0d]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4ff3a] ring-1 ring-black/30" />
            02 / Selected work
            <span className={`text-base normal-case italic tracking-normal ${SERIF}`}>({pad(N)})</span>
          </p>

          <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span className="line-in block will-change-transform">Projects I&rsquo;ve</span>
            </span>
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <span className="line-in block will-change-transform">
                <span className={`text-[1.1em] font-normal italic tracking-normal ${SERIF}`}>
                  built &amp; shipped.
                </span>
              </span>
            </span>
          </h2>
        </div>

        <div className="max-w-md lg:pt-9">
          <p className="head-desc text-base leading-relaxed md:text-lg">
            <ScrubWords
              text="A selection of production applications and full-stack projects covering e-commerce, GPS fleet tracking, AI chat with tool calling, financial analytics, brand websites, authentication, payments, and cloud deployment."
              final={SCRUB_FINAL}
            />
          </p>
        </div>
      </div>

      {/* ───────────── Desktop: pinned projector ───────────── */}
      <div className="d-pin relative hidden h-[100svh] min-h-[600px] overflow-hidden lg:block motion-reduce:lg:hidden">
        {/* spotlight */}
        <div
          aria-hidden
          className="d-lamp pointer-events-none absolute inset-0"
          style={
            {
              "--mx": "70%",
              "--my": "30%",
              background:
                "radial-gradient(circle 34vmax at var(--mx) var(--my), rgba(212,255,58,0.38), rgba(212,255,58,0) 70%)",
            } as React.CSSProperties
          }
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-12 pb-7 pt-8">
          {/* top bar */}
          <div className="flex shrink-0 items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#0d0d0d]/55">
            <span>Index of work</span>
            <span>
              <span className="d-count text-[#0d0d0d]">01</span> / {pad(N)}
            </span>
          </div>

          {/* main grid */}
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12">
            {/* text column */}
            <div className="relative overflow-visible">
              {/* ghost numeral reel */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-6 top-[-0.15em] z-0 h-[1em] select-none overflow-hidden font-semibold leading-none tracking-[-0.06em] [font-size:min(16vw,38svh)]"
                style={{ WebkitTextStroke: "1px rgba(13,13,13,0.12)", color: "transparent" }}
              >
                <div className="d-reel will-change-transform">
                  {PROJECTS.map((p, i) => (
                    <div key={p.title} className="h-[1em]">
                      {pad(i + 1)}
                    </div>
                  ))}
                </div>
              </div>

              {/* stacked text blocks */}
              <div className="relative z-10 grid">
                {PROJECTS.map((p, i) => (
                  <div key={p.title} className="d-block col-start-1 row-start-1">
                    <p className="tf flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0d0d0d]/55">
                      <span>
                        {pad(i + 1)}/{pad(N)}
                      </span>
                      <span className="h-px w-8 bg-[#0d0d0d]/25" />
                      <span>{p.period}</span>
                    </p>

                    <h3 className="-mb-[0.14em] mt-3 overflow-hidden pb-[0.14em] font-semibold leading-[0.95] tracking-[-0.04em] [font-size:clamp(2rem,min(3.7vw,7.4svh),3.8rem)]">
                      <span className="tm block">{p.title}</span>
                    </h3>

                    <p
                      className={`-mb-[0.2em] mt-2 overflow-hidden pb-[0.2em] italic text-[#0d0d0d]/65 [font-size:clamp(1.05rem,min(1.6vw,3.2svh),1.5rem)] ${SERIF}`}
                    >
                      <span className="tm block">{p.category}</span>
                    </p>

                    <p className="tf mt-4 max-w-[34rem] text-[clamp(13px,1.05vw,15px)] leading-[1.55] text-[#3b3b37]">
                      {p.description}
                    </p>

                    <p className="tf mt-4 font-mono text-[11.5px] leading-relaxed text-[#0d0d0d]/75">
                      <span className="text-[#0d0d0d]/45">Stack · </span>
                      {p.stack}
                    </p>

                    <ul className="tf mt-4 grid grid-cols-2 gap-x-6 border-t border-[#0d0d0d]/15">
                      {p.highlights.map((h, n) => (
                        <li
                          key={h}
                          className="flex gap-2.5 border-b border-[#0d0d0d]/15 py-1.5 text-[12.5px] leading-snug text-[#0d0d0d]/80"
                        >
                          <span className="pt-px font-mono text-[10px] text-[#0d0d0d]/40">
                            {pad(n + 1)}
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tf group/link mt-5 inline-flex items-center gap-2 bg-[linear-gradient(#d4ff3a,#d4ff3a)] bg-[length:100%_0.3em] bg-bottom bg-no-repeat pb-0.5 text-sm font-semibold transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[length:100%_100%]"
                    >
                      View project
                      <LuArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* image stage */}
            <div className="d-stage relative h-[min(66svh,38rem)] [@media(hover:hover)_and_(pointer:fine)]:cursor-none">
              {PROJECTS.map((p) => (
                <div key={p.title} className="d-layer absolute inset-0 will-change-transform">
                  <div
                    className={`d-clip absolute inset-0 overflow-hidden rounded-2xl border border-[#0d0d0d]/10 ${dotted}`}
                  >
                    <div className="d-inner h-full w-full will-change-transform">
                      <Shot src={p.image} title={p.title} />
                    </div>
                    <Corners />
                    <div className="absolute left-6 top-6">
                      <StatusChip status={p.status} />
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${p.title}`}
                      className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#0d0d0d]/20 bg-white text-[#0d0d0d] transition-colors duration-300 hover:border-[#0d0d0d] hover:bg-[#d4ff3a]"
                    >
                      <LuArrowUpRight size={17} />
                    </a>
                  </div>
                </div>
              ))}

              {/* cursor bubble */}
              <div
                aria-hidden
                className="d-bubble pointer-events-none invisible absolute left-0 top-0 z-20 grid h-[88px] w-[88px] place-items-center rounded-full bg-[#d4ff3a] text-[#0d0d0d]"
              >
                <span className="flex items-center gap-1 text-[13px] font-semibold">
                  Visit
                  <LuArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* progress rail */}
          <div className="mt-6 flex shrink-0 items-center gap-6">
            <span className="d-name w-40 shrink-0 truncate font-mono text-[11px] uppercase tracking-[0.18em]">
              {PROJECTS[0].title}
            </span>

            <div className="relative flex flex-1 items-center justify-between">
              <span className="absolute inset-x-0 top-1/2 h-px bg-[#0d0d0d]/15" />
              <span
                className="d-prog absolute inset-x-0 top-1/2 h-px origin-left bg-[#0d0d0d]"
                style={{ transform: "scaleX(0)" }}
              />
              {PROJECTS.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  data-on={i === 0}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${p.title}`}
                  className="d-dot relative z-10 h-2 w-2 rounded-full bg-[#0d0d0d]/30 ring-[6px] ring-[#f1efe9] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0d0d0d] data-[on=true]:w-9 data-[on=true]:bg-[#0d0d0d]"
                />
              ))}
            </div>

            <span className="w-16 shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-[#0d0d0d]/45">
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* ───────────── Mobile / Tablet swipeable carousel ───────────── */}
      <div className="px-6 pb-16 sm:px-8 md:px-12 lg:hidden motion-reduce:lg:block">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0d0d0d]/45">
          Swipe →
        </p>
        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 [&::-webkit-scrollbar]:hidden">
          {PROJECTS.map((p, i) => (
            <MobileCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProjects;