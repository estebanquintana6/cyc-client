import { useEffect, useState } from "react";

import PhotoCarousel from "./PhotoCarousel";
import RecommendationBar from "./RecommendationBar";

import { fetch } from "../../../utils/authFetch";

const ProjectInfo = ({
  id,
  name,
  description,
  photos,
  lotes,
  surface,
  greenAreas,
}) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id) return;
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/projects/recommendations/${id}`,
          "GET",
        );

        if (status === 200) {
          setRecommendations(data);
        }
      } catch (error) {
        console.error("Error al recuperar recomendaciones");
      }
    };
    fetchRecommendations();
  }, [id]);

  return (
    <section
      className="flex flex-col min-h-screen px-4 py-32 sm:px-16 sm:max-w-full"
      id="project-info"
    >
      <div className="m-auto flex flex-col">
        <div className="flex flex-col mb-8">
          <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {name}
          </h1>
        </div>

        <div className="mt-8 mx-auto grid gap-6 row-gap-8 lg:grid-cols-2 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <div className="flex flex-col justify-center xs:order-2 sm:order-1">
            <div className="max-w-xl mb-6">
              <p className="text-base text-gray-700 whitespace-pre text-wrap md:text-lg">
                {description}
              </p>
            </div>
            <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
              {surface?.length > 0 && (
                <div className="bg-white border-l-4 shadow-sm border-primary-100">
                  <div className="h-full p-5 border border-l-0 rounded-r">
                    <h6 className="mb-2 font-semibold leading-5">Superficie</h6>
                    <p className="text-sm text-gray-900">{surface}</p>
                  </div>
                </div>
              )}
              {lotes?.length > 0 && (
                <div className="bg-white border-l-4 shadow-sm border-primary-100">
                  <div className="h-full p-5 border border-l-0 rounded-r">
                    <h6 className="mb-2 font-semibold leading-5">
                      Número de lotes
                    </h6>
                    <p className="text-sm text-gray-900">{lotes}</p>
                  </div>
                </div>
              )}
              {greenAreas?.length > 0 && (
                <div className="bg-white border-l-4 shadow-sm border-primary-100">
                  <div className="h-full p-5 border border-l-0 rounded-r">
                    <h6 className="mb-2 font-semibold leading-5">
                      Áreas verdes
                    </h6>
                    <p className="text-sm text-gray-900">{greenAreas}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="xs:order-1 sm:order-2">
            <PhotoCarousel photos={photos} />
          </div>
          <div className="order-3 md:mt-12 xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 mx-auto">
            <h2 className="max-w-lg mb-6 font-sans text-xl font-bold tracking-tight text-gray-900 sm:text-2xl sm:leading-none">
              Otros proyectos que podrían interesarte
            </h2>
            <RecommendationBar projects={recommendations} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
