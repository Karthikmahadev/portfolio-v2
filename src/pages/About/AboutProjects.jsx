import React from "react";

const PROJECTS = [
  {
    title: "Perspective",
    description: "A platform for design inspirations and portfolios.",
    image: `${import.meta.env.BASE_URL}perspective.jpg`,
  },
  {
    title: "The Wanderer's Palette",
    description: "Travel blog with curated experiences.",
    image: `${import.meta.env.BASE_URL}travel.jpg`,
  },
  {
    title: "WealthWise",
    description: "Finance tracker and wealth management app.",
    image: `${import.meta.env.BASE_URL}wealthwise.jpg`,
  },
  {
    title: "Career Compass",
    description: "Job search and career growth assistant.",
    image: `${import.meta.env.BASE_URL}job.jpg`,
  },
];



const ProjectCard = ({ title, category, date, image, link }) => {
  const isComingSoon = !link;

  const CardContent = (
    <div
      className={`relative bg-[#f5f5f5] rounded-xl overflow-hidden transition-transform duration-300 ease-in-out ${
        isComingSoon
          ? "cursor-not-allowed opacity-90"
          : "cursor-pointer hover:-translate-y-1.5"
      }`}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-60 object-cover"
        />

        {/* Overlay if Coming Soon */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              🚧 Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="p-5 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-[#111] mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <p className="text-sm text-gray-400 whitespace-nowrap ml-auto">
          {date}
        </p>
      </div>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
};

const AboutProjects = () => {
  return (
    <div className="bg-[#f4f4f4] px-6 sm:px-8 md:px-12 py-10 md:py-16">
      <div className="flex flex-col lg:flex-row justify-between items-start max-w-[1400px] mx-auto gap-10">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111] leading-tight">
            See the magic
            <br />
            for yourself
          </h2>
        </div>
        <div className="flex-1 max-w-sm">
          <p className="text-base text-gray-600 leading-relaxed">
            Browse a curated collection of moments that have made their way into
            the hearts of clients.
          </p>
        </div>
        <div className="flex-1 max-w-sm">
          <p className="text-base text-gray-600 leading-relaxed">
            <strong className="text-[#111]">What’s my style?</strong>
            <br />
            Natural, emotive, and storytelling-focused. I aim to capture the
            real you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-16 px-2 sm:px-0">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default AboutProjects;
