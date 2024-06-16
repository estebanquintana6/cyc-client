import { useRef } from "react";
import { Modal, Carousel } from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const MapModal = ({ onClose, pin }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  const { title, photos } = pin;

  return (
    <Modal show={true} onClose={onClose} ref={modalRef}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="flex h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel className="mx-auto">
            {photos.map(({ url, description }) => (
              <img src={`${process.env.REACT_APP_SERVER_URL}/${url}`} alt={description} />
            ))}
          </Carousel>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
