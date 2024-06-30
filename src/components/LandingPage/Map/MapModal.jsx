import { useRef, useEffect } from "react";
import { Carousel } from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const MapModal = ({ onClose, pin: { title, text, photos } }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  useEffect(() => {
    document.querySelector('button.swal2-confirm').innerHTML = 'Cerrar';
  }, []);

  return (
    <div className="sm:p-4">
      <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900">
        {title}
      </h1>
      <div className="flex flex-col xs:h-[20rem] sm:h-[28rem]">
        <Carousel className="mx-auto h-full">
          {photos.map(({ url, description }) => (
            <div className="flex flex-col">
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

      <div className="font-light text-gray-500 text-lg dark:text-gray-400">
        {text}
      </div>
    </div>
  );
};

export default MapModal;
