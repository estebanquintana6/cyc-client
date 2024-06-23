import React, { useRef } from "react";
import { Link } from "react-router-dom";

import BlogItem from "./BlogItem";

import { useIsVisible } from "../../../../hooks/useIsVisible";

const BlogSection = () => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  return (
    <section
      className="flex w-full min-h-screen pb-16 xs:p-4 sm:p-8 md:p-16 lg:p-32"
      id="blog"
    >
      <div ref={ref} className={`mx-auto my-auto transition-opacity ease-in duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
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
          <BlogItem
            title={"Conquer the World"}
            date={"13 Jul 2020"}
            description={
              "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque."
            }
            imgSrc={
              "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
            }
            link={"/blog/1"}
          />
          <BlogItem
            title={"Ejemplo"}
            date={"4 Nov 2020"}
            description={
              "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque."
            }
            imgSrc={
              "https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
            }
            link={"/blog/1"}
          />
          <BlogItem
            title={"Explore the beautiful"}
            date={"28 Dec 2020"}
            description={
              "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque."
            }
            imgSrc={
              "https://images.pexels.com/photos/2123755/pexels-photo-2123755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            }
            link={"/blog/1"}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
