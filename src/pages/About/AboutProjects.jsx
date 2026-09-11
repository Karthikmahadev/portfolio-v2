import React from "react";
import { LuArrowUpRight } from "react-icons/lu";

const PROJECTS = [
  {
    number: "01",
    title: "The Relish Jar",
    category: "Production E-Commerce Platform",
    period: "Aug 2026 — Present",
    stack:
      "Next.js · TypeScript · Tailwind CSS · Supabase · PostgreSQL · Razorpay · Vercel",
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
    number: "02",
    title: "BB FleetTracker",
    category: "Live GPS Fleet-Tracking Platform",
    period: "Dec 2025 — Jul 2026",
    stack:
      "Next.js · TypeScript · React Native · Expo · Supabase · PostgreSQL · DigitalOcean",
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
    number: "03",
    title: "Origa.market",
    category: "Production B2B E-Commerce Platform",
    period: "Jun 2024 — Sep 2025",
    stack:
      "React.js · Tailwind CSS · Bootstrap · GraphQL · Algolia · PhonePe",
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
    number: "04",
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

const ProjectCard = ({
  number,
  title,
  category,
  period,
  stack,
  image,
  link,
  status,
  description,
  highlights,
}) => {
  return (
    <article className="group">

      {/* Project Image */}
      <div className="relative h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden rounded-2xl bg-white border border-gray-200">

        <img
          src={image}
          alt={`${title} project preview`}
          loading="lazy"
          className="w-full h-full object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Status */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.12em] text-[#111]">
            {status}
          </span>
        </div>

        {/* External Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${title}`}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 text-[#111] transition-all duration-300 hover:bg-[#111] hover:text-white hover:border-[#111]"
          >
            <LuArrowUpRight size={17} />
          </a>
        )}
      </div>

      {/* Project Details */}
      <div className="pt-6">

        {/* Number + Title + Date */}
        <div className="flex items-start justify-between gap-5">

          <div className="flex gap-3">

            <span className="text-xs text-gray-400 pt-1">
              {number}
            </span>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#111] tracking-tight leading-none">
                {title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {category}
              </p>
            </div>

          </div>

          <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap pt-1">
            {period}
          </span>

        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-5 max-w-2xl">
          {description}
        </p>

        {/* Technology */}
        <div className="mt-5">

          <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2">
            Technologies
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            {stack}
          </p>

        </div>

        {/* Highlights */}
        <div className="mt-5 flex flex-wrap gap-2">

          {highlights.map((highlight, index) => (
            <span
              key={index}
              className="text-xs sm:text-sm text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-2"
            >
              {highlight}
            </span>
          ))}

        </div>

        {/* Live Project */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#111] border-b border-[#111] pb-1 transition-opacity hover:opacity-50"
          >
            View project
            <LuArrowUpRight size={15} />
          </a>
        )}

      </div>
    </article>
  );
};

const AboutProjects = () => {
  return (
    <section className="bg-[#f4f4f4] px-6 sm:px-8 md:px-12 py-16 md:py-24">

      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-14 md:mb-18">

          {/* Heading */}
          <div className="max-w-2xl">

            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">
              Selected Work
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#111] leading-[0.95] tracking-[-0.04em]">
              Projects I've
              <br />
              built & shipped.
            </h2>

          </div>

          {/* Description */}
          <div className="max-w-md lg:pt-7">

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              A selection of production applications and full-stack projects
              covering e-commerce, GPS fleet tracking, financial analytics,
              authentication, payments, and cloud deployment.
            </p>

          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16 lg:gap-y-20">

          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.number}
              {...project}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default AboutProjects;