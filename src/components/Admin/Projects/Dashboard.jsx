import { useEffect, useState } from "react";

import { useGalleryFilter } from "../../contexts/GalleryFilterContext";

import GalleryItem from "./GalleryItem";
import GalleryFilters from "../../ProjectPage/Gallery/GalleryFilters";
import ActionBar from "./ActionBar";

import { mockGalleryItems } from "../../../utils/mocks";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { filter } = useGalleryFilter();

  useEffect(() => {
    // TODO: Fetch different items
    console.log("fetching different projects");
    setProjects(mockGalleryItems);
  }, [filter]);

  return (
    <section
      className="flex flex-col min-h-screen px-4 py-16 sm:max-w-full"
      id="project-info"
    >
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Administrar proyectos
        </h1>
      </div>

      <ActionBar />

      <GalleryFilters />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {projects.map(({ id, title, imgUrl }) => (
          <GalleryItem id={id} title={title} imgUrl={imgUrl} key={id} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
