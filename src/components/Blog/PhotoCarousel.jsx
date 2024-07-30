import { Carousel } from "flowbite-react";

const PhotoCarousel = ({ photos = [] }) => {
  return (
    <div className="h-[44rem] w-full">
        <Carousel 
          className="mx-auto h-full"
          leftControl={
            <a role="button" className="bg-primary-100 hover:bg-primary-150 flex h-10 w-10 border rounded-full">
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
            <a role="button" className="bg-primary-100 hover:bg-primary-150 flex h-10 w-10 border rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-white m-auto"
              >
                <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
              </svg>
            </a>
          }>
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
