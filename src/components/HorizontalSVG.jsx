import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const HorizontalSVG = () => {
  const pathRef = useRef();

  useEffect(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 4,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <svg
      width="100%"
      height="150"
      viewBox="0 0 1440 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <path
        ref={pathRef}
        d="M0,80 C300,300 600,0 900,80 C1200,160 1440,0 1440,0"
        stroke="#ffffff"
        strokeWidth="4"
        fill="none"
        strokeDasharray="3000"
        strokeDashoffset="3000"
      />
    </svg>
  );
};

export default HorizontalSVG;
