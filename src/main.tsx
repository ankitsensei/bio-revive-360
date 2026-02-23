import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import OrganBiologicalAge from "./pages/OrganBiologicalAge";
import OrganBiologicalAge2 from "./pages/OrganBiologicalAge2";
import Assessment from "./pages/Assessment";
import Modules from "./pages/Modules";
import Lifestyle from "./pages/Lifestyle";
import Vision from "./pages/Vision";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Assessment" element={<Assessment />} />
        <Route path="Modules" element={<Modules />} />
        <Route path="Lifestyle" element={<Lifestyle />} />
        <Route path="Vision" element={<Vision />} />
        <Route path="OrganBiologicalAge" element={<OrganBiologicalAge />} />
        <Route path="OrganBiologicalAge2" element={<OrganBiologicalAge2 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);