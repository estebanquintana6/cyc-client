import { useOutlet } from "react-router-dom";
import ContactDashboard from "../ContactDashboard/ContactDashBoard";

const Main = () => {
  const outlet = useOutlet();

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            { outlet || <ContactDashboard />}
      </div>
    </div>
  );
};

export default Main;