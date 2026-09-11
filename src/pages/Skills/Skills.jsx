import React from "react";
const skills = [
  { name: "JavaScript", logo: "/portfolio-v2/js.png" },
  { name: "TypeScript", logo: "/portfolio-v2/typescript.webp" },
  { name: "React", logo: "/portfolio-v2/react.png" },
  { name: "Next.js", logo: "/portfolio-v2/next.png" },
  { name: "React Native", logo: "/portfolio-v2/react-native.webp" },
  { name: "Grafana", logo: "/portfolio-v2/grafana.webp" },
  { name: "Express", logo: "/portfolio-v2/express.png" },
  { name: "PostgreSQL", logo: "/portfolio-v2/postgresql.png" },
  { name: "Algolia", logo: "/portfolio-v2/algolio.png" },
  { name: "Node.js", logo: "/portfolio-v2/nodejs.png" },
  { name: "Supabase", logo: "/portfolio-v2/supabase.webp" },
  { name: "Git", logo: "/portfolio-v2/git.webp" },
];
const Skills = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-8 py-10 font-sans">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-left mb-8">
        Built on{" "}
        <span className="bg-lime-300 px-3 py-1 rounded-md text-xl sm:text-2xl align-middle">
          Code
        </span>{" "}
        <br /> Driven by Vision
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
          {skills.map((client, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-4 flex justify-center items-center h-28 shadow-sm hover:shadow-md transition"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-14 max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="flex-1 bg-[#121212] text-white rounded-2xl p-8 md:p-12 relative">
           <p className="text-2xl md:text-4xl font-medium leading-tight max-w-4xl">
            "I enjoy owning a feature from database schema and API design all
            the way to the interface, deployment, and production reliability."
          </p>

          <div className="mt-8">
            <strong className="block font-semibold">
              Karthik Mahadev
            </strong>

            <span className="text-sm text-gray-400">
              Full Stack Developer
            </span>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Skills;
