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
import BlogPage from "./routes/blogPage";
import BlogEntryPage from "./routes/blogEntryPage";

import ProjectDashboard from "./components/Admin/Projects/Main";
import UserDashboard from "./components/Admin/Users/UserDashboard";
import PinDashboard from "./components/Admin/Pins/PinDashboard";
import BlogDashboard from "./components/Admin/Blogs/BlogDashboard";
import TextDashboard from "./components/Admin/Text/TextDashboard";

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
    path: "/blog",
    element: <BlogPage />
  },
  {
    path: "/blog/:id",
    element: <BlogEntryPage />
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
    }, {
      path: "pins",
      element: <PinDashboard />
    }, {
      path: "blog",
      element: <BlogDashboard />
    }, {
      path: "textos",
      element: <TextDashboard />
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
