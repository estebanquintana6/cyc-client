import React from 'react';
import './index.css';

import MainHeader from "./components/Header/MainHeader"
import ProjectSection from './components/Content/ProjectsSection';
import BlogSection from './components/Content/BlogSection';
import ContactSection from './components/Contact/ContactSection';

function App() {
  return (
    <main>
      <MainHeader />
      <ProjectSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}

export default App;