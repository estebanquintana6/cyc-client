import { Carousel } from "flowbite-react";

const PhotoCarousel = ({ photos = [] }) => {
  return (
    <div className="h-56 xs:h-96 sm:h-full">
        <Carousel slide={true}>
        {photos.map((url) => (
            <img src={url} alt="proyecto recomendado" key={url} />
        ))}
        </Carousel>
    </div>
  );
};

export default PhotoCarousel;