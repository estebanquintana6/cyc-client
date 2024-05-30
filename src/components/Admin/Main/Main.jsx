import { useOutlet } from "react-router-dom";

const Main = () => {
  const outlet = useOutlet();

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            { outlet || <h2>Main</h2>}
      </div>
    </div>
  );
};

export default Main;