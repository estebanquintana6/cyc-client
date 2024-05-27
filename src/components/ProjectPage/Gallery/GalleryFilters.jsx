import { useGalleryFilter } from "../../contexts/GalleryFilterContext";

import FILTERS from "./filters";

const GalleryFilters = () => {
  const { filter, setFilter } = useGalleryFilter();
  
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className={`${filter === FILTERS.ALL ? 'bg-primary-100 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}  border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
        onClick={() => setFilter(FILTERS.ALL)}
      >
        Todos
      </button>
      <button
        type="button"
        className={`${filter === FILTERS.CIUDADES ? 'bg-primary-100 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}  border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
        onClick={() => setFilter(FILTERS.CIUDADES)}
      >
        Ciudades
      </button>
      <button
        type="button"
        className={`${filter === FILTERS.DESARROLLOS ? 'bg-primary-100 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}  border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
        onClick={() => setFilter(FILTERS.DESARROLLOS)}
      >
        Desarrollos
      </button>
    </div>
  );
};

export default GalleryFilters;
