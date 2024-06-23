const Gallery = () => {
  return (
    <section
      className="flex flex-col min-h-screen px-4 py-32 sm:px-16 sm:max-w-full"
      id="project-info"
    >
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Blog
        </h1>
        <p className="mt-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-end">
          Subtitulo
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      </div>
    </section>
  );
};

export default Gallery;
