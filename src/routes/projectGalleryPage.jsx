import { useEffect } from "react";

import Gallery from "../components/ProjectPage/Gallery/Gallery";
import Nav from "../components/ProjectPage/Nav/Nav";
import ContactSection from "../components/LandingPage/Contact/ContactSection";

const ProjectGalleryPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <Nav />
      <Gallery />
      <ContactSection />
    </>
  );
};

export default ProjectGalleryPage;
