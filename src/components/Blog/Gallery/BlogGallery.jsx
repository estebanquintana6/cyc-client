import { useEffect, useState } from "react";

import GalleryItem from "./GalleryItem";

import { fetch } from "../../../utils/authFetch";

const Gallery = ({ texts: { dashboard_blog } }) => {
  const [blogEntries, setBlogEntries] = useState([]);

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/blogs`,
          "GET",
        );
        if (status === 200) {
          setBlogEntries(data);
        }
      } catch {
        console.error(
          "Error en el servidor al hacer fetch de las entradas del blog",
        );
      }
    };
    fetchBlogEntries();
  }, []);

  return (
    <section
      className="flex flex-col min-h-screen px-16 md:px-24 lg:px-32 py-32 sm:max-w-full"
      id="project-info"
    >
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Blog
        </h1>
        <p className="mt-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-end whitespace-pre text-wrap">
          { dashboard_blog }
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogEntries.map((entry) => (
          <GalleryItem {...entry} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
