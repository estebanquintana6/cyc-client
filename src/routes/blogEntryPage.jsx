import { useParams } from "react-router-dom";

import BlogEntry from "../components/Blog/BlogEntry";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";
import { useEffect } from "react";

const BlogEntryPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { id } = useParams();
    return (
        <>
            <Nav />
            <BlogEntry id={id}/>
            <ContactSection />
        </>
    )
}

export default BlogEntryPage;