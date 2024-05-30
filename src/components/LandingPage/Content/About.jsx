import React, { useRef } from "react";
import { useIsVisible } from "../../../hooks/useIsVisible";

const About = () => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <section className="flex bg-white min-h-screen w-full xs:p-4 sm:p-16" id="about">
      <div
        ref={ref}
        className={`gap-16 items-center py-8 px-4 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 transition-opacity ease-in duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            ¿Qué es CYC?
          </h1>
          <p className="mb-4">
            <span className="relative inline-block px-2 mr-1">
              <span className="absolute inset-0 transform -skew-x-12 bg-primary-100" />
              <span className="relative text-white">Somos</span>
            </span>
            una empresa que suma conocimiento clásico, ciencia de última
            generación y una visión integradora del ser humano.
          </p>
          <p className="mb-4">
            <span className="relative inline-block px-2 mr-1">
              <span className="absolute inset-0 transform -skew-x-12 bg-primary-100" />
              <span className="relative text-white">Colaboramos</span>
            </span>
            con otras empresas en la creación de estrategias únicas para
            facilitar y acelerar el camino al éxito de los proyectos. Fomentamos
            el bienestar y una actitud ganar-ganar en todas nuestras relaciones.
          </p>
          <p>
            <span className="relative inline-block px-2 mr-1">
              <span className="absolute inset-0 transform -skew-x-12 bg-primary-100" />
              <span className="relative text-white">Creemos</span>
            </span>
            en la responsabilidad, disciplina, autoconsciencia y alto goce como
            partes fundamentales del continuo presente.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default About;