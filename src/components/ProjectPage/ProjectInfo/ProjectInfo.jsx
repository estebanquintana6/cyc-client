
import PhotoCarousel from "./PhotoCarousel";
import RecommendationBar from "./RecommendationBar";

const ProjectInfo = ({ name, description, designer, photos: photosMetadata, surface}) => {
  const photos = photosMetadata?.map(({url}) => `http://localhost:4000/${url}`);

  return (
    <section
      className="flex flex-col min-h-screen px-4 py-32 sm:px-16 sm:max-w-full"
      id="project-info"
    >
      <div className="m-auto flex flex-col">
        <div className="flex flex-col mb-8">
          <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            { name }
          </h1>
        </div>

        <div className="mt-8 mx-auto grid gap-6 row-gap-8 lg:grid-cols-2 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <div className="flex flex-col justify-center xs:order-2 sm:order-1">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-xl font-bold tracking-tight text-gray-900 sm:text-2xl sm:leading-none">
                Diseñador de proyecto:
                <span className="relative px-1 ml-2">
                  <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-secondary" />
                  <span className="relative inline-block text-2xl text-primary-100 sm:text-3xl">
                    { designer }
                  </span>
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                { description }
              </p>
            </div>
            <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
              <div className="bg-white border-l-4 shadow-sm border-primary-100">
                <div className="h-full p-5 border border-l-0 rounded-r">
                  <h6 className="mb-2 font-semibold leading-5">Superficie</h6>
                  <p className="text-sm text-gray-900">{ surface }</p>
                </div>
              </div>
            </div>
          </div>
          <div className="xs:order-1 sm:order-2">
            <PhotoCarousel photos={photos} />
          </div>
          <div className="order-3 xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 mx-auto">
            <h2 className="max-w-lg mb-6 font-sans text-xl font-bold tracking-tight text-gray-900 sm:text-2xl sm:leading-none">
              Otros proyectos que podrían interesarte
            </h2>
            <RecommendationBar projects={[1, 2, 3, 4]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
