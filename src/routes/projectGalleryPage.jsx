import { useEffect } from "react";

import Gallery from "../components/ProjectPage/Gallery/Gallery";
import Nav from "../components/ProjectPage/Nav/Nav";
import ContactSection from "../components/LandingPage/Contact/ContactSection";

import { GalleryFilterProvider } from "../components/contexts/GalleryFilterContext";

const ProjectGalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <GalleryFilterProvider>
        <Nav />
        <Gallery />
        <ContactSection />
      </GalleryFilterProvider>
    </>
  );
};

export default ProjectGalleryPage;
