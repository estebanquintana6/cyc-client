import { useEffect, useState } from "react";

import { useGalleryFilter } from "../../contexts/GalleryFilterContext";

import GalleryItem from "./GalleryItem";
import GalleryFilters from "../../ProjectPage/Gallery/GalleryFilters";
import ActionBar from "./ActionBar";

import { mockGalleryItems } from "../../../utils/mocks";
import authFetch from "../../../utils/authFetch";
import { useAuthContext } from "../../contexts/AuthContext";

import { errorModal } from "../../../utils/errorModal";

const Dashboard = () => {
  const { token } = useAuthContext();
  
  const [projects, setProjects] = useState([]);
  const { filter } = useGalleryFilter();

  const fetchProjects = async () => {
    try {
      const { status, data } = await authFetch("http://localhost:4000/projects/", "GET", token);
      if (status === 200) {
        setProjects(data);
      } 
    } catch(err) {
      const { response: { data: { error } } } = err;
      errorModal(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

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
      <ActionBar fetchProjects={fetchProjects} />
      <GalleryFilters />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:mt-4">
        {projects.map(({ _id, name, photos }) => {
          const imgUrl = photos.length > 0 ? `http://localhost:4000/${photos[0]?.url}` : '';
          return (
          <GalleryItem id={_id} title={name} imgUrl={imgUrl} key={_id} />
        )})}
      </div>
    </section>
  );
};

export default Dashboard;
