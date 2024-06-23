import { useEffect } from "react";

import BlogEntry from "../components/Blog/BlogEntry";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";

const BlogEntryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <>
            <Nav />
            <BlogEntry />
            <ContactSection />
        </>
    )
}

export default BlogEntryPage;