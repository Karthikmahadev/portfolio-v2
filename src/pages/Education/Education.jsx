import React from "react";

// ✅ Place these images inside the "public" folder (e.g., public/vikaasa.jpg)
const EDUCATION_DATA = [
  {
    number: "01",
    title: "Vikaasa",
    description:
      "Laid the foundation of my academic journey, where I developed curiosity, discipline, and a drive to learn beyond the classroom.",
    image: "/vikaasa.jpg", // public/vikaasa.jpg
  },
  {
    number: "02",
    title: "Cambridge",
    description:
      "Enhanced critical thinking and problem-solving skills through a globally recognized curriculum, building strong fundamentals for higher studies.",
    image: "/cambridge.webp", // public/cambridge.webp
  },
  {
    number: "03",
    title: "Ramco Institute of Technology",
    description:
      "Pursued my undergraduate degree, gaining hands-on experience in technology, software development, and teamwork while preparing for real-world challenges.",
    image: "/ramco.webp", // public/ramco.webp
  },
];

const Education = () => {
  return (
    <section className="w-full bg-[#f9f9f9]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-6 md:px-12 py-12 max-w-[1400px] mx-auto">
        <h3 className="text-black text-2xl font-semibold">Education</h3>
        <h4 className="text-lg md:text-2xl lg:text-3xl text-gray-500 font-bold text-right leading-snug md:leading-normal w-full md:w-1/2">
          From <span className="text-black">concept to classroom</span>, I build
          learning experiences that resonate — combining{" "}
          <span className="text-black">structure, creativity</span> and
          real-world relevance.
        </h4>
      </div>

      {/* Education List */}
      <div className="flex flex-col divide-y divide-gray-200 max-w-[1400px] mx-auto">
        {EDUCATION_DATA.map((edu, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 px-6 md:px-12 py-10"
          >
            {/* Number */}
            <div className="w-full md:w-1/5">
              <p className="text-xs text-gray-500 tracking-widest mb-2">
                {edu.number}
              </p>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/3">
              <h6 className="text-lg font-semibold mb-3">{edu.title}</h6>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {edu.description}
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-2/5">
              <img
                src={edu.image}
                alt={edu.title}
                loading="lazy"
                className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
