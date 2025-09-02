import React from "react";
import { FaArrowRight } from "react-icons/fa";

const EXPERIENCE_STATS = [
  {
    number: "1+",
    label: (
      <>
        YEARS
        <br />
        OF EXPERIENCE
      </>
    ),
  },
  {
    number: "5+",
    label: (
      <>
        PROJECTS
        <br />
        DELIVERED
      </>
    ),
  },
  {
    number: "3+",
    label: (
      <>
        CLIENTS
        <br />
        COLLABORATED WITH
      </>
    ),
  },
];

const ExperienceCard = ({ number, label }) => (
  <div className="bg-[#121212] rounded-2xl p-8 w-[220px] sm:w-[250px] h-[240px] sm:h-[270px] flex flex-col justify-center items-end text-white">
    <span className="text-6xl sm:text-8xl font-semibold self-start leading-none">
      {number}
    </span>
    <span className="mt-auto tracking-tight text-sm sm:text-base md:text-lg uppercase text-gray-400 text-right leading-snug">
      {label}
    </span>
  </div>
);

const AboutWorkExperience = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-10 lg:gap-16 px-6 sm:px-10 py-10 justify-between items-center">
      {/* Heading */}
      <h1 className="flex items-center gap-4 text-4xl sm:text-6xl md:text-7xl lg:text-[120px] leading-tight font-bold">
        About
        <FaArrowRight
          size={40}
          className="text-black dark:text-white flex-shrink-0"
        />
      </h1>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {EXPERIENCE_STATS.map((stat, index) => (
          <ExperienceCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default AboutWorkExperience;
