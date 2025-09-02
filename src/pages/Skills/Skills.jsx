import React from "react";
import htmlLogo from '../../assets/html.png';
import cssLogo from '../../assets/css.png';
import jsLogo from '../../assets/js.png';
import reactLogo from '../../assets/react.png';
import nextLogo from '../../assets/next.png';
import bootstrapLogo from '../../assets/bootstrap.webp';
import tailwindLogo from '../../assets/tailwind.png';
import mysqlLogo from '../../assets/mysql.png';
import algoliaLogo from '../../assets/algolio.png';
import nodejsLogo from '../../assets/nodejs.png';
import javaLogo from '../../assets/java.png';
import springBootLogo from '../../assets/springboot.png';


const skills = [
  { name: "HTML", logo: htmlLogo },
  { name: "CSS", logo: cssLogo },
  { name: "JavaScript", logo: jsLogo },
  { name: "React", logo: reactLogo },
  { name: "Next.js", logo: nextLogo },
  { name: "Bootstrap", logo: bootstrapLogo },
  { name: "Tailwind", logo: tailwindLogo },
  { name: "MySQL", logo: mysqlLogo },
  { name: "Algolia", logo: algoliaLogo },
  { name: "Node.js", logo: nodejsLogo },
  { name: "Java", logo: javaLogo },
  { name: "Spring Boot", logo: springBootLogo },
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
        <div className="flex-1 bg-gray-200 rounded-xl p-6 relative">
          <p className="text-4xl text-gray-600 leading-none">“</p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2">
            Every project I build is powered by a mix of creativity,
            problem-solving, and solid technical foundations. From crafting
            pixel-perfect interfaces to architecting robust backends, I focus on
            writing clean, scalable, and efficient code. My goal is to turn
            ideas into impactful digital experiences that not only work—but
            inspire.
          </p>
          <p className="text-4xl text-gray-600 text-right mt-3">”</p>
          <div className="mt-4">
            <strong className="block font-semibold">Karthik Mahadev</strong>
            <span className="text-sm text-gray-600">Full Stack Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
