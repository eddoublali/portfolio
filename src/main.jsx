import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // Changed from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Celent from "./components/Celient";
import ProjectForm from "./components/ProjectForm";
import Project from "./components/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Celent />
      },
      {
        path: "/projectform",
        element: <ProjectForm />
      },
      {
        path: "/projectform/:projectId",
        element: <ProjectForm />
      },
      {
        path: "/project",
        element: <Project />
      },
      {
        path: "*",
        element: <Celent />
      }
    ]
  }
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);