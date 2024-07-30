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
      description,
    });

    setIsModalOpen(true);
  };

  return (
    <Fragment>
      <div className="h-56 xs:h-96 w-full">
        <Carousel
          leftControl={
            <a role="button" className="bg-primary-100 flex h-10 w-10 border rounded-full">
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
            <a role="button" className="bg-primary-100 flex h-10 w-10 border rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-white m-auto"
              >
                <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
              </svg>
            </a>
          }
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
      {isModalOpen && (
        <PhotoModal
          {...selectedPhoto}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </Fragment>
  );
};

export default PhotoCarousel;
