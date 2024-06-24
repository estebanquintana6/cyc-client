import { useRef, useState } from "react";
import { Modal, Carousel } from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const MapModal = ({ onClose, pin }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  const [currentDescription, setCurrentDescription] = useState("");

  const { title, photos } = pin;

  const onSlideChange = (slide) => {
    setCurrentDescription(photos[slide]?.description || "");
  }

  return (
    <Modal
      show={true}
      onClose={onClose}
      ref={modalRef}
      position={"center"}
      theme={{ content: { base: "relative h-auto w-full p-4" } }}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col h-[32rem] grid-cols-2 gap-4">
              <Carousel
                className="mx-auto"
                onSlideChange={(slide) => onSlideChange(slide)}
              >
                {photos.map(({ url, description }) => (
                  <div className="flex flex-col">
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                      alt={description}
                    />
                  </div>
                ))}
              </Carousel>

              <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800 text-center">
                <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                  {currentDescription}
                </p>
              </blockquote>
          </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
