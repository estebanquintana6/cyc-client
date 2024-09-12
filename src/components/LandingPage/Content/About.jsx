import React, { useRef } from "react";
import { useIsVisible } from "../../../hooks/useIsVisible";

const About = ({ texts }) => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <section
      className="flex bg-white min-h-screen w-full xs:p-4 sm:p-16"
      id="about"
    >
      <div
        ref={ref}
        className={`gap-16 items-center py-8 px-4 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 transition-opacity ease-in duration-400 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <p className="mb-4 whitespace-pre text-wrap">
            {texts.landing_about_section}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="/img/about-1.jpeg"
            alt="about content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="/img/about-2.jpeg"
            alt="about content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
