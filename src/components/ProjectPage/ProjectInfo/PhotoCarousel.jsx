import { Carousel } from "flowbite-react";

const PhotoCarousel = ({ photos = [] }) => {
  return (
    <div className="h-56 xs:h-96 sm:h-full">
        <Carousel slide={false} className="min-h-[400px]">
        {photos.map((url) => (
            <img src={url} alt="proyecto recomendado" className="h-full" key={url} />
        ))}
        </Carousel>
    </div>
  );
};

export default PhotoCarousel;
