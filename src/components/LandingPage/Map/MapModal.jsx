import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const MapModal = ({ onClose, pin: { title, text, photos, link } }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    document.querySelector("button.swal2-confirm").innerHTML = "Cerrar";
  }, []);

  console.log(photos);

  return (
    <div className="sm:p-4">
      <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900">
        {title}
      </h1>
      { photos.length > 0 && (
      <div className="flex flex-col xs:h-[20rem] sm:h-[28rem]">
        <Carousel className="mx-auto h-full">
          {photos.map(({ _id, url, description }) => (
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
      {(link?.length > 0) && (
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
