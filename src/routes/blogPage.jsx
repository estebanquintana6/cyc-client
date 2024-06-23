import { useEffect } from "react";

import BlogGallery from "../components/Blog/Gallery/BlogGallery";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <>
            <Nav />
            <BlogGallery />
            <ContactSection />
        </>
    )
}

export default BlogPage;