import { Carousel } from "flowbite-react";

const PhotoCarousel = ({ photos = [] }) => {
  return (
    <div className="h-56 xs:h-96 sm:h-full w-full">
        <Carousel slide={false} className="xs:min-h-[300px] xs:max-h-[300px] sm:min-h-[400px] sm-max-h-[400px] w-full">
        {photos.map((url) => (
            <img src={url} alt="proyecto recomendado" className="h-full object-contain" key={url} />
        ))}
        </Carousel>
    </div>
  );
};

export default PhotoCarousel;
