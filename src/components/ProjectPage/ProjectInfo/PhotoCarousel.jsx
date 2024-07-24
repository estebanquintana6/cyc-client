import { Fragment, useState } from "react";
import { Carousel } from "flowbite-react";
import PhotoModal from "./PhotoModal";

const PhotoCarousel = ({ photos = [] }) => {
  const [currentDescription, setCurrentDescription] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSlideChange = (slide) => {
    setCurrentDescription(photos[slide]?.description || "");
  };

  const onPhotoClick = (photoUrl, description) => {
    setSelectedPhoto({
      photoUrl,
      description
    });

    setIsModalOpen(true);
  }

  return (
    <Fragment>
      <div className="h-56 xs:h-96 w-full">
        <Carousel
          onSlideChange={(slide) => onSlideChange(slide)}
          slide={false}
          className="xs:min-h-[300px] xs:max-h-[300px] sm:min-h-[400px] sm-max-h-[400px] w-full"
        >
          {photos
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            .map(({ url }) => (
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                alt="proyecto recomendado"
                className="h-full object-contain"
                key={url}
                onClick={() => onPhotoClick(url, currentDescription)}
              />
            ))}
        </Carousel>
        {currentDescription.length > 0 && (
          <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800 text-center">
            <p className="text-md italic font-medium leading-relaxed text-gray-900 dark:text-white">
              {currentDescription}
            </p>
          </blockquote>
        )}
      </div>
      { isModalOpen && (
        <PhotoModal {...selectedPhoto} closeModal={() => setIsModalOpen(false)} />
      )}
    </Fragment>
  );
};

export default PhotoCarousel;
