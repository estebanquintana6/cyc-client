import { useRef, useEffect } from "react";
import { Carousel } from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const MapModal = ({ onClose, pin: { title, text, photos, link } }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    document.querySelector("button.swal2-confirm").innerHTML = "Cerrar";
  }, []);

  return (
    <div className="sm:p-4">
      <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900">
        {title}
      </h1>
      {photos.length > 0 && (
        <div className="flex flex-col xs:h-[20rem] sm:h-[28rem]">
          <Carousel 
            className="mx-auto h-full"
            leftControl={
              <a role="button" className="bg-primary-100 hover:bg-primary-150 flex h-10 w-10 border rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-white m-auto"
                >
                  <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                </svg>
              </a>
            }
            rightControl={
              <a role="button" className="bg-primary-100 hover:bg-primary-150 flex h-10 w-10 border rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-white m-auto"
                >
                  <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                </svg>
              </a>
            }>
            {photos
              .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
              .map(({ _id, url, description }) => (
                <div className="flex flex-col" key={_id}>
                  <img
                    className="h-full object-contain"
                    src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                    alt={description}
                  />
                  <blockquote className="border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800 text-center">
                    <p className="text-lg italic font-medium leading-relaxed text-gray-900 dark:text-white">
                      {description}
                    </p>
                  </blockquote>
                </div>
              ))}
          </Carousel>
        </div>
      )}
      <div className="font-light text-gray-500 text-lg dark:text-gray-400">
        {text}
      </div>
      {link?.length > 0 && (
        <div className="flex justify-center mt-2">
          <a
            href={link}
            aria-label=""
            className="inline-flex text-lg items-center font-semibold transition-colors duration-200 bg-primary-100 p-2 rounded-lg text-white hover:text-secondary"
          >
            Conoce más
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default MapModal;
