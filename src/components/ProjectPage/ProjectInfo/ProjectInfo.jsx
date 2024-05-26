import { useEffect } from "react";
import { useParams } from "react-router-dom";

import PhotoCarousel from "./PhotoCarousel";

const ProjectInfo = () => {
  const { id } = useParams();

  const photos = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
  ];

  useEffect(() => {
    console.log("fetching resource with id:", id);
  }, [id]);

  return (
    <section
      className="flex flex-col min-h-screen px-4 py-32 sm:px-16 sm:max-w-full"
      id="project-info"
    >
      <div className="m-auto flex flex-col">
        <div className="flex flex-col mb-8">
          <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Maderas Residencial Celaya
          </h1>
        </div>

        <div className="mt-8 mx-auto grid gap-6 row-gap-8 lg:grid-cols-2 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <div className="flex flex-col justify-center xs:order-2 sm:order-1">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-xl font-bold tracking-tight text-gray-900 sm:text-2xl sm:leading-none">
                Diseñador de proyecto:
                <span className="relative px-1 ml-2">
                  <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-secondary" />
                  <span className="relative inline-block text-2xl text-primary-100 sm:text-3xl">
                    Grupo Pro Habitación GP
                  </span>
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Atendiendo a la topografía específica de este desarrollo y sobre
                todo del entorno en el que se encuentra localizado (nombre
                oficial Del desarrollo) fue planeado a partir de aprovechar al
                máximo el tipo de energía disponible naturalmente en el entorno,
                y potenciarla a partir de la estratégica localización y
                dirección de elementos claves tales como cuerpos de agua,
                trazado de las calles, arcos de entrada, entre otros. El
                resultado se verá reflejado en el bienestar Y generación de
                oportunidades para quienes en este espacio habiten.
              </p>
            </div>
            <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
              <div className="bg-white border-l-4 shadow-sm border-primary-100">
                <div className="h-full p-5 border border-l-0 rounded-r">
                  <h6 className="mb-2 font-semibold leading-5">
                    Fecha de completado
                  </h6>
                  <p className="text-sm text-gray-900">Enero 2014</p>
                </div>
              </div>
              <div className="bg-white border-l-4 shadow-sm border-primary-100">
                <div className="h-full p-5 border border-l-0 rounded-r">
                  <h6 className="mb-2 font-semibold leading-5">Superficie</h6>
                  <p className="text-sm text-gray-900">11 hectáreas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="xs:order-1 sm:order-2">
            <PhotoCarousel photos={photos} />
            { /*<img
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              alt=""
                /> */ }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
