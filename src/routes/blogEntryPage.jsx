import { useParams } from "react-router-dom";

import BlogEntry from "../components/Blog/BlogEntry";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";

const BlogEntryPage = () => {
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