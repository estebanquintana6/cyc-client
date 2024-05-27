import { createContext, useState, useContext } from "react";

import FILTERS from "../ProjectPage/Gallery/filters";

const GalleryFilterContext = createContext({
    filter: ""
});

export const GalleryFilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(FILTERS.ALL);
  const value = {
    filter,
    setFilter,
  };

  return (
    <GalleryFilterContext.Provider value={value}>
      {children}
    </GalleryFilterContext.Provider>
  );
};

export const useGalleryFilter = () => {
  return useContext(GalleryFilterContext);
};

export default GalleryFilterContext;
