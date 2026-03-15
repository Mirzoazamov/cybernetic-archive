import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Routerni bu yerdan olib tashladik, chunki u App.tsx ichida bor
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
