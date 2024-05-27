const RecommendationBar = ({ projects = [] }) => {
  return (
  <div class="grid grid-cols-2 gap-6 xs:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
          <div className="col-span-1 flex flex-col text-center bg-white">
            <div className="xs:h-40 xs:w-40 sm:h-64 sm:w-64">
              <img className="h-full w-full object-cover object-center" src="https://flowbite-react.com/images/blog/image-4.jpg" alt="project" />
            </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationBar;
