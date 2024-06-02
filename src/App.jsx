import React from "react";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from "./components/contexts/AuthContext";

import LandingPage from "./routes/landingPage";
import ProjectGalleryPage from "./routes/projectGalleryPage";
import ProjectPage from "./routes/projectPage";
import AdminPanelPage from "./routes/admin/adminPanelPage";
import LoginPage from "./routes/loginPage";

import ProjectDashboard from "./components/Admin/Projects/Main";
import UserDashboard from "./components/Admin/Users/UserDashboard";

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
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    element: <AdminPanelPage />,
    children: [{
      path: "proyectos",
      element: <ProjectDashboard />
    }, {
      path: "usuarios",
      element: <UserDashboard />
    }]
  }
]);

function App() {
  return (
    <AuthProvider>
      <main>
        <RouterProvider router={router} />
      </main>
    </AuthProvider>
  );
}

export default App;
