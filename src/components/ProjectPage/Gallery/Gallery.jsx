import { useEffect, useState } from "react";

import GalleryItem from "./GalleryItem";
import GalleryFilters from "./GalleryFilters";

import { useGalleryFilter } from "../../contexts/GalleryFilterContext";
import { useAuthContext } from "../../contexts/AuthContext";

import FILTERS from "./filters";
import authFetch from "../../../utils/authFetch";

const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const { filter } = useGalleryFilter();
  const { token } = useAuthContext();


  useEffect(() => {
    if (filter === FILTERS.ALL) {
      setFilteredProjects([]);
    }
    if ( filter === FILTERS.CIUDADES ) {
      const filter = projects.filter(({ projectType }) => projectType === "Ciudades");
      setFilteredProjects(filter);
    }
    if ( filter === FILTERS.DESARROLLOS ) {
      const filter = projects.filter(({ projectType }) => projectType === "Desarrollo");
      setFilteredProjects(filter);
    }
  }, [filter, projects]);


  useEffect(() => {
    const fetchProjects = async () => {
      const { status, data } = await authFetch(`${process.env.REACT_APP_SERVER_URL}/projects/`, 'GET', token);
      if (status === 200) {
        setProjects(data);
      } else {
          console.error("Error en el servidor al hacer fetch de los proyectos");
      }
    }
    fetchProjects();
    // eslint-disable-next-line
  }, []);

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
        <GalleryFilters />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {(filter === FILTERS.ALL ? projects: filteredProjects).map(({ name, photos, _id}) => {
        const photoUrl = `${process.env.REACT_APP_SERVER_URL}/${photos[0]?.url}`;  
        return (<GalleryItem id={_id} title={name} imgUrl={photoUrl} key={_id} />)
      })}
      </div>
    </section>
  );
};

export default Gallery;
