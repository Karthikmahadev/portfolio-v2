import React, { useState } from "react";
import { LuCopy, LuArrowUpRight } from "react-icons/lu";

const Myself = () => {
  const email = "karthikmahadev2001@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <section className="p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        {/* Name */}
        <div className="leading-[0.85]">
          <span className="block text-5xl sm:text-7xl md:text-[7rem] lg:text-[9rem] font-bold uppercase tracking-[-0.06em]">
            Karthik
          </span>

          <span className="block text-5xl sm:text-7xl md:text-[7rem] lg:text-[9rem] font-bold uppercase tracking-[-0.06em]">
            Mahadev
          </span>
        </div>

        {/* Profile Image */}
        <div className="rounded-full h-32 w-32 sm:h-40 sm:w-40 md:h-[180px] md:w-[180px] overflow-hidden shrink-0">
          <img
            src="/portfolio-v2/profile-img.jpg"
            alt="Karthik Mahadev"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-12">
        {/* Contact */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleCopy}
            className="font-medium text-base sm:text-lg md:text-xl flex items-center gap-2 hover:opacity-60 transition-opacity"
          >
            {email}
            <LuCopy size={16} />

            {copied && (
              <span className="text-sm text-green-600 font-medium">
                Copied!
              </span>
            )}
          </button>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Karthikmahadev"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/karthikmahadev19"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
            >
              LinkedIn ↗
            </a>

            <a
              href="/portfolio-v2/Karthik_Mahadev_B_Full_Stack_Developer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              Resume <LuArrowUpRight className="inline ml-1" size={14} />
            </a>
          </div>
        </div>

        {/* Introduction */}
        <div className="w-full lg:w-[55%] xl:w-[48%]">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold leading-tight tracking-tight">
            Full Stack Developer with 2+ years of experience building and
            shipping production web and mobile applications using React,
            Next.js, TypeScript, Node.js, and PostgreSQL.
          </p>

          <p className="text-base md:text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
            I enjoy owning features end-to-end — from database design and
            authentication to APIs, responsive interfaces, payments, testing,
            and production deployment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Myself;