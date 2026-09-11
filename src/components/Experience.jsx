import React from "react";

const EXPERIENCE = [
  {
    period: "Aug 2026 — Present",
    company: "Kridhan's Enterprises",
    role: "Freelance — Full Stack Developer",
    product: "The Relish Jar",
    description:
      "Built and deployed a production e-commerce platform as the sole developer, owning requirements, UI, database design, backend workflows, payment integration, and deployment.",
    stack:
      "Next.js · TypeScript · Tailwind CSS · Supabase · PostgreSQL · Razorpay · Vercel",
  },
  {
    period: "Dec 2025 — Jul 2026",
    company: "Binary Budds",
    role: "Founding Full Stack Developer",
    product: "BB FleetTracker",
    description:
      "Built and shipped a multi-tenant GPS fleet-tracking SaaS and supporting React Native applications for drivers, parents, and school administrators.",
    stack:
      "Next.js · TypeScript · React Native · Expo · Supabase · PostgreSQL · DigitalOcean",
  },
  {
    period: "Jun 2024 — Sep 2025",
    company: "Origa Technologies",
    role: "Software Engineer",
    product: "Origa.market",
    description:
      "Developed and optimized a production-scale B2B e-commerce platform covering product catalog, search, cart, checkout, payments, and transactional workflows.",
    stack:
      "React · Tailwind CSS · Bootstrap · GraphQL · Algolia · PhonePe",
  },
];

const Experience = () => {
  return (
    <section className="px-6 sm:px-8 md:px-12 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
              Career
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Experience
            </h2>
          </div>

          <p className="max-w-md text-gray-500 text-base md:text-lg leading-relaxed">
            Experience building production software across e-commerce,
            fleet-tracking, financial applications, and client products.
          </p>
        </div>

        <div className="border-t border-gray-200">
          {EXPERIENCE.map((item, index) => (
            <article
              key={index}
              className="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-6 lg:gap-12 py-10 border-b border-gray-200"
            >
              {/* Period */}
              <div className="text-sm text-gray-400">{item.period}</div>

              {/* Company */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  {item.role}
                </h3>

                <p className="text-gray-500 mt-1">{item.company}</p>

                <p className="text-sm font-medium mt-5">
                  {item.product}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <p className="text-sm text-gray-400 mt-5 leading-relaxed">
                  {item.stack}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;