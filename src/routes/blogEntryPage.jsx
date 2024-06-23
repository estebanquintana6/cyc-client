import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BlogEntry from "../components/Blog/BlogEntry";
import ContactSection from "../components/LandingPage/Contact/ContactSection";
import Nav from "../components/ProjectPage/Nav/Nav";

import { fetch } from "../utils/authFetch";

const BlogEntryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogEntry, setBlogEntry] = useState({});

    const fetchBlogEntry = async () => {
        try {
          const { status, data } = await fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/get/${id}`, "GET");
    
          if (status === 200) setBlogEntry(data);
    
        } catch (err) {
            console.log(err);
          navigate("/");
        }
      }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogEntry();
      }, []);
    
    return (
        <>
            <Nav />
            <BlogEntry {...blogEntry}/>
            <ContactSection />
        </>
    )
}

export default BlogEntryPage;