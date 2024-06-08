import React, { useRef } from "react";
import { useIsVisible } from "../../../hooks/useIsVisible";

const About = () => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <section
      className="flex bg-white min-h-screen w-full xs:p-4 sm:p-16"
      id="about"
    >
      <div
        ref={ref}
        className={`gap-16 items-center py-8 px-4 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 transition-opacity ease-in duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            ¿Qué es CYC?
          </h1>
          <p className="mb-4">
            En
            <span className="relative inline-block px-2 mx-2">
              <span className="absolute inset-0 transform -skew-x-12 bg-primary-100" />
              <span className="relative text-white">
                Connie Yepiz Consulting
              </span>
            </span>
            nos dedicamos a transformar entornos y crear comunidades que
            impulsan al ser humano a prosperar y a tener una mejor calidad de
            vida.
          </p>
          <p className="mb-4">
            Nuestro enfoque combina una amplia gama de herramientas, que van
            desde el conocimiento clásico oriental hasta tecnología de última
            generación en el campo de la biofísica aplicada. Utilizamos estas
            herramientas para analizar el macro entorno, la tierra y la
            geografía, y a partir de ahí, llevar a cabo la planificación urbana
            de ciudades y proyectos habitacionales.
          </p>
          <p>
            Creemos en la importancia de comprender la energía del entorno para
            canalizarla y así promover el bienestar de quienes lo habitan,
            creando así comunidades que facilitan el florecimiento humano y una
            vida plena. Nuestro equipo experto trabaja con pasión y dedicación
            para garantizar que cada desarrollo refleje nuestros valores de
            respeto hacia la naturaleza y compromiso con el bienestar humano.
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
