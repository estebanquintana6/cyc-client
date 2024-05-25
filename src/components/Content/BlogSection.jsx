import React from "react";
import BlogItem from "./BlogItem";

const BlogSection = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 min-h-screen">
      <div className="flex flex-col mb-6">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Mantente al día con nuestro blog
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Nos enorgullece ser pioneros en Occidente en aplicar a gran escala
          técnicas clásicas para el manejo, canalización y aprovechamiento de
          las frecuencias de energía del entorno (Qi). <br /> Te compartimos un
          poco de nuestro trabajo a través de nuestro blog.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center mx-auto"
        >
          Conoce más
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        <BlogItem
          title={"Conquer the World"}
          date={"13 Jul 2020"}
          description={
            "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque."
          }
          imgSrc={"https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"}
          link={"/"}
        />
        <BlogItem
          title={"Ejemplo"}
          date={"4 Nov 2020"}
          description={
            "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque."
          }
          imgSrc={"https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"}
          link={"/"}
        />
        <BlogItem
          title={"Explore the beautiful"}
          date={"28 Dec 2020"}
          description={
            "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque."
          }
          imgSrc={"https://images.pexels.com/photos/2123755/pexels-photo-2123755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
          link={"/"}
        />
      </div>
    </div>
  );
};

export default BlogSection;
