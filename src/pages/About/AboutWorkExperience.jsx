import React from "react";
import { FaArrowRight } from "react-icons/fa";

const EXPERIENCE_STATS = [
  {
    number: "2+",
    label: (
      <>
        YEARS
        <br />
        EXPERIENCE
      </>
    ),
  },
  {
    number: "3",
    label: (
      <>
        PRODUCTION
        <br />
        PLATFORMS
      </>
    ),
  },
  {
    number: "40%",
    label: (
      <>
        PERFORMANCE
        <br />
        IMPROVEMENT
      </>
    ),
  },
  {
    number: "E2E",
    label: (
      <>
        END-TO-END
        <br />
        OWNERSHIP
      </>
    ),
  },
];

const ExperienceCard = ({ number, label }) => (
  <div className="bg-[#121212] rounded-2xl p-6 sm:p-7 w-full h-[220px] sm:h-[240px] flex flex-col justify-center items-end text-white">
    <span className="text-5xl sm:text-6xl lg:text-7xl font-semibold self-start leading-none tracking-tight">
      {number}
    </span>

    <span className="mt-auto tracking-tight text-xs sm:text-sm uppercase text-gray-400 text-right leading-snug">
      {label}
    </span>
  </div>
);

const AboutWorkExperience = () => {
  return (
    <section className="flex flex-col xl:flex-row gap-10 xl:gap-16 px-6 sm:px-10 lg:px-12 py-16 justify-between items-start">
      {/* Heading */}
      <div className="flex items-center gap-4 shrink-0">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-none font-bold tracking-[-0.05em]">
          About
        </h1>

        <FaArrowRight
          size={35}
          className="text-black dark:text-white mt-2"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full xl:w-auto">
        {EXPERIENCE_STATS.map((stat, index) => (
          <ExperienceCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default AboutWorkExperience;