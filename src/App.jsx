import React from "react";
import "./index.css";

import LandingPage from "./routes/landingPage";
import ProjectGalleryPage from "./routes/projectGalleryPage";
import ProjectPage from "./routes/projectPage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/proyectos",
    element: <ProjectGalleryPage />,
  },
  {
    path: "/proyectos/:id",
    element: <ProjectPage />
  }
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
