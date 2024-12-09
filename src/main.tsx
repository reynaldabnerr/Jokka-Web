import "core-js/stable"; // Polyfill modern JavaScript API
import "regenerator-runtime/runtime"; // Polyfill untuk async/await
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
