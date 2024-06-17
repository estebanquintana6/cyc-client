import { useRef } from "react";
import { Modal, Carousel } from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const MapModal = ({ onClose, pin }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  const { title, photos } = pin;

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
        <div className="flex h-96 grid-cols-2 gap-4 2xl:h-96">
          <Carousel className="mx-auto">
            {photos.map(({ url, description }) => (
              <div className="flex flex-col">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                  alt={description}
                />
                <h2>{description}</h2>
              </div>
            ))}
          </Carousel>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
