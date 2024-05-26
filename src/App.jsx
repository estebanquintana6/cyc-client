import React from "react";
import "./index.css";

import LandingPage from "./routes/landingPage";
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
