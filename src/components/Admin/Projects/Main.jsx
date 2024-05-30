import { GalleryFilterProvider } from "../../contexts/GalleryFilterContext";

import Dashboard from "./Dashboard";

const Main = () => {
    return  (
        <GalleryFilterProvider>
            <Dashboard />
        </GalleryFilterProvider>
    )
}

export default Main;