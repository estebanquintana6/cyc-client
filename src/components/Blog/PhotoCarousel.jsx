import { Carousel } from "flowbite-react";

const PhotoCarousel = ({ photos = [] }) => {
  return (
    <div className="h-[44rem] w-full">
        <Carousel className="mx-auto h-full">
            {photos
              .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
              .map(({ _id, url, description }) => (
                <div className="flex flex-col" key={_id}>
                  <img
                    className="h-full object-contain"
                    src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                    alt={description}
                  />
                    <figure className="text-center">
                      {description}
                    </figure>
                </div>
              ))}
        </Carousel>
    </div>
  );
};

export default PhotoCarousel;
