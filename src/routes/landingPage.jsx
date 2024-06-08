import { useEffect, useState } from "react";

import MainHeader from "../components/LandingPage/Header/MainHeader";
import About from "../components/LandingPage/Content/About";
import ProjectSection from "../components/LandingPage/Content/Projects/ProjectsSection";
import BlogSection from "../components/LandingPage/Content/Blog/BlogSection";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import EducationalMap from "../components/LandingPage/Map/EducationalMap";

import { useAuthContext } from "../components/contexts/AuthContext";

import authFetch from "../utils/authFetch";

const LandingPage = () => {

  const { token } = useAuthContext();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { status, data } = await authFetch(`${process.env.REACT_APP_SERVER_URL}/projects/fetch`, 'GET', token);
      if (status === 200) {
        setProjects(data);
      } else {
          console.error("Error en el servidor al hacer fetch de los proyectos");
      }
    }
    fetchProjects();
  }, []);

  return (
    <>
      <MainHeader />
      <About />
      <ProjectSection projects={projects} />
      <EducationalMap />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default LandingPage;
