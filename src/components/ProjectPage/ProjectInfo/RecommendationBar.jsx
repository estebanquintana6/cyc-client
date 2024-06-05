import { useNavigate } from "react-router";

const RecommendationBar = ({ projects }) => {
  const navigate = useNavigate();

  const handleRecommendationClick = (id) => {
    navigate(`/proyectos/${id}`);
  }

  return (
    <div className="grid grid-cols-2 gap-6 xs:grid-cols-2 lg:grid-cols-4">
      {projects.map(({ _id, name, photos }) => {
        const photoUrl = `${process.env.REACT_APP_SERVER_URL}/${photos[0]?.url}`;
        return (
          <div className="col-span-1 flex flex-col text-center bg-white cursor-pointer" onClick={() => handleRecommendationClick(_id)}>
            <div className="xs:h-40 xs:w-40 sm:h-64 sm:w-64">
              <img
                className="h-full w-full object-cover object-center"
                src={photoUrl}
                alt="project"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationBar;
