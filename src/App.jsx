import React from "react";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./routes/landingPage";
import ProjectGalleryPage from "./routes/projectGalleryPage";
import ProjectPage from "./routes/projectPage";
import AdminPanelPage from "./routes/admin/adminPanelPage";

import ProjectDashboard from "./components/Admin/Projects/Main";

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
  },
  {
    path: "/admin",
    element: <AdminPanelPage />,
    children: [{
      path: "proyectos",
      element: <ProjectDashboard />
    }]
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
