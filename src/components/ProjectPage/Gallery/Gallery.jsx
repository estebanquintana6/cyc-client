import { useEffect, useState } from "react";

import GalleryItem from "./GalleryItem";
import GalleryFilters from "./GalleryFilters";

import { useGalleryFilter } from "../../contexts/GalleryFilterContext";
import { mockGalleryItems } from "../../../utils/mocks";

const Gallery = () => {
  const [projects, setProjects] = useState(mockGalleryItems);

  const { filter } = useGalleryFilter();

  useEffect(() => {
    // TODO: Fetch different items
    console.log("fetching different projects");
    setProjects(mockGalleryItems);
  }, [filter]);

  return (
    <section
      className="flex flex-col min-h-screen px-4 py-32 sm:px-16 sm:max-w-full"
      id="project-info"
    >
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Nuestro trabajo
        </h1>
        <p className="mt-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-end">
          Nos enorgullece ser pioneros en Occidente en aplicar a gran escala
          técnicas clásicas para el manejo, canalización y aprovechamiento de
          las frecuencias de energía del entorno (Qi). Nuestro currículum, es
          reflejo de compromiso con el conocimiento, innovación y excelencia.
        </p>
      </div>
      <div className="flex flex-col mb-8">
        <h4>Filtros</h4>
        <GalleryFilters />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {projects.map(({ id, title, imgUrl }) => (
          <GalleryItem id={id} title={title} imgUrl={imgUrl} key={id} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
