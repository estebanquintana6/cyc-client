import MainHeader from "../components/LandingPage/Header/MainHeader";
import About from "../components/LandingPage/Content/About";
import ProjectSection from "../components/LandingPage/Content/Projects/ProjectsSection";
import BlogSection from "../components/LandingPage/Content/Blog/BlogSection";
import ContactSection from "../components/LandingPage/Contact/ContactSection";

const LandingPage = () => {
  return (
    <>
      <MainHeader />
      <About />
      <ProjectSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default LandingPage;
