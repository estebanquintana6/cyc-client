import { useEffect, useState } from "react";

import MainHeader from "../components/LandingPage/Header/MainHeader";
import About from "../components/LandingPage/Content/About";
import ProjectSection from "../components/LandingPage/Content/Projects/ProjectsSection";
import BlogSection from "../components/LandingPage/Content/Blog/BlogSection";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import EducationalMap from "../components/LandingPage/Map/EducationalMap";

import { useAuthContext } from "../components/contexts/AuthContext";

import authFetch from "../utils/authFetch";
import { getSiteTexts } from "../utils/fetchTexts";
import { defaultText } from "../utils/defaultTexts";

const LandingPage = () => {

  const { token } = useAuthContext();

  const [projects, setProjects] = useState([]);
  const [texts, setTexts] = useState({
    landing_project_title: "",
    landing_map_title: "",
    landing_blog_title: "",
    landing_contact_title: "",
    landing_about_section: "",
    landing_project_section: "",
    landing_map_section: "",
    landing_blog_section: "",
    landing_contact_section: "",
    dashboard_projects: "",
    dashboard_blog: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { status, data } = await authFetch(`${process.env.REACT_APP_SERVER_URL}/projects/fetch`, 'GET', token);
      if (status === 200) {
        setProjects(data);
      } else {
        setProjects(defaultText);
          console.error("Error en el servidor al hacer fetch de los proyectos");
      }
    }
    fetchProjects();
  }, [token]);

  useEffect(() => {
    const getTexts = async () => {
      const data = await getSiteTexts();
      setTexts(data);
    };
    try {
      getTexts();
    } catch {
      console.error("Error al obtener el archivo de textos");
    }
  }, []);

  return (
    <>
      <MainHeader />
      <About texts={texts} />
      <ProjectSection projects={projects} texts={texts} />
      <EducationalMap texts={texts} />
      <BlogSection texts={texts} />
      <ContactSection texts={texts} />
    </>
  );
};

export default LandingPage;
