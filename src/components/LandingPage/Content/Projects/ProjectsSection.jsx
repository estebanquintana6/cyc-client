import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { useIsVisible } from "../../../../hooks/useIsVisible";

import ProjectItem from "./ProjectItem";

const ProjectSection = ({ projects }) => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <section
      className="flex w-full min-h-screen xs:p-4 sm:p-8 md:p-16 lg:p-32"
      id="proyectos"
    >
      <div
        ref={ref}
        className={`mx-auto my-auto transition-opacity ease-in duration-400 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-end md:mb-6">
            Nuestra Trayectoria
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-end">
            Nos especializamos en la planeación y desarrollo de macro proyectos,
            desde la selección del terreno hasta su lanzamiento. Analizamos
            características topográficas y energéticas para ubicar
            estratégicamente áreas clave del proyecto.
          </p>
        </div>
        <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
          {projects.map(({ name, photos, _id}) => {
            const photoUrl = `${process.env.REACT_APP_SERVER_URL}/${photos[0]?.url}`;  
            return (
                <ProjectItem key={_id} title={name} imgUrl={photoUrl} href={`/proyectos/${_id}`} />
              );
          })}
        </div>
        <div className="text-center">
          <Link
            to="/proyectos"
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
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
