import React, { useRef } from "react";
import { useIsVisible } from "../../../hooks/useIsVisible";

import ProjectItem from "./ProjectItem";

const ProjectSection = () => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <section
      className="flex w-full min-h-screen xs:p-4 sm:p-8 md:p-16 lg:p-32"
      id="proyectos"
    >
      <div
        ref={ref}
        className={`mx-auto my-auto transition-opacity ease-in duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-end md:mb-6">
            Nuestros proyectos
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-end">
            Nos especializamos en la planeación y desarrollo de macro proyectos,
            desde la selección del terreno hasta su lanzamiento. Analizamos
            características topográficas y energéticas para ubicar
            estratégicamente áreas clave del proyecto.
          </p>
        </div>
        <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
          <ProjectItem title={"Mona Lisa"} imgUrl={"https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"} href={"/proyectos/1"} />
          <ProjectItem title={"The Starry Night"} imgUrl={"https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"} href={"/proyectos/1"} />
          <ProjectItem title={"The Kiss"} imgUrl={"https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"} href={"/proyectos/1"} />
          <ProjectItem title={"The Harvesters"} imgUrl={"https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"} href={"/proyectos/1"} />
        </div>
        <div className="text-center">
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 bg-primary-100 p-4 rounded-lg text-white hover:text-secondary"
          >
            Ver proyectos
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
