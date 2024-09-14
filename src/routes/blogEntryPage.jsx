import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogEntry from "../components/Blog/BlogEntry";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";

import { defaultText } from "../utils/defaultTexts";

const BlogEntryPage = () => {
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

  const { id } = useParams();
  return (
    <>
      <Nav />
      <BlogEntry id={id} />
      <ContactSection texts={texts} />
    </>
  );
};

export default BlogEntryPage;
