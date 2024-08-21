import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import PatrimoinePage from "./pages/PatrimoinePage.jsx";
import PossessionListPage from "./pages/PossessionListPage.jsx";
import CreatePossessionPage from "./pages/CreatePossessionPage.jsx";
import UpdatePossessionPage from "./pages/UpdatePossessionPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/possession" replace />} />
      <Route path="/possession" element={<PossessionListPage />} />
      <Route path="/possession/create" element={<CreatePossessionPage />} />
      <Route
        path="/possession/:libelle/update"
        element={<UpdatePossessionPage />}
      />

      <Route path="/patrimoine" element={<PatrimoinePage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
