import React from "react";
import "./index.css";

import MainHeader from "./components/Header/MainHeader";
import About from "./components/Content/About";
import ProjectSection from "./components/Content/ProjectsSection";
import BlogSection from "./components/Content/BlogSection";
import ContactSection from "./components/Contact/ContactSection";

function App() {
  return (
    <main>
      <MainHeader />
      <About />
      <ProjectSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}

export default App;
