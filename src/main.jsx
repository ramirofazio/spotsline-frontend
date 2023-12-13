import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "pages/routes";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Routes />
    </NextUIProvider>
  </React.StrictMode>
);
