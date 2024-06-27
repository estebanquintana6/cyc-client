import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BlogItem from "./BlogItem";

import { useIsVisible } from "../../../../hooks/useIsVisible";
import { fetch } from "../../../../utils/authFetch";

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};


const BlogSection = () => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  const [blogEntries, setBlogEntries] = useState([]);

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/blogs/recent`,
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
      className="flex w-full min-h-screen pb-16 xs:p-4 sm:p-8 md:p-16 lg:p-32"
      id="blog"
    >
      <div ref={ref} className={`mx-auto my-auto transition-opacity ease-in duration-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
            Sumérgete en nuestro mundo de contenidos a través de nuestro Blog
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Nos enorgullece ser pioneros en Occidente en aplicar a gran escala
            técnicas clásicas para el manejo, canalización y aprovechamiento de
            las frecuencias de energía del entorno (Qi). <br /> Te compartimos
            un poco de nuestro trabajo a través de nuestro blog.
          </p>
          <div className="flex justify-center">
            <Link
              to="/blog"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 bg-primary-100 p-4 rounded-lg text-white hover:text-secondary"
            >
              Visita nuestro blog
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {blogEntries.map(({ _id, title, created_at, text, photo}) => (
            <BlogItem
              title={title}
              date={new Date(created_at).toLocaleDateString('es-MX', dateOptions)}
              description={text}
              imgSrc={`${process.env.REACT_APP_SERVER_URL}/${photo}`}
              link={`/blog/${_id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
