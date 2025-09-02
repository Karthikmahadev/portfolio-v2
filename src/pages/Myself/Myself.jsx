import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";

const Myself = () => {
  const email = "karthikmahadev2001@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    // reset after 2s
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:p-8 h-auto md:h-[50vh]">
        <div className="leading-tight text-center md:text-left">
          <span className="block text-4xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-bold uppercase">
            Karthik
          </span>
          <span className="block text-4xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-bold uppercase">
            Mahadev
          </span>
        </div>
        <div className="rounded-full h-32 w-32 sm:h-40 sm:w-40 md:h-[168px] md:w-[168px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/profile-img.jpg"
            alt="Profile"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mt-6">
        <div>
          <button
            onClick={handleCopy}
            className="font-medium text-base sm:text-lg md:text-xl bg-white border-none flex items-center gap-2"
          >
            {email} <LuCopy size={15} />{copied && (
            <span className="ml-2 text-sm text-green-600 font-medium">
              Copied!
            </span>
          )}
          </button>
          
        </div>

        <div className="w-full md:w-[60%] lg:w-[43%]">
          <p className="text-left text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold">
            Hi, I'm a full stack developer with a strong passion for creating
            clean, user-centric interfaces. With a year of hands-on experience
            and based in the culturally rich city of Thanjavur, I strive to
            build engaging and accessible digital experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Myself;
