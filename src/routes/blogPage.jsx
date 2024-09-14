import { useEffect, useState } from "react";

import BlogGallery from "../components/Blog/Gallery/BlogGallery";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";

import { getSiteTexts } from "../utils/fetchTexts";
import { defaultText } from "../utils/defaultTexts";

const BlogPage = () => {
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getTexts = async () => {
      const data = await getSiteTexts();
      setTexts(data);
    };
    try {
      getTexts();
    } catch {
      console.error("Error al obtener el archivo de textos");
      setTexts(defaultText);
    }
  }, []);

  return (
    <>
      <Nav />
      <BlogGallery texts={texts} />
      <ContactSection texts={texts}/>
    </>
  );
};

export default BlogPage;
