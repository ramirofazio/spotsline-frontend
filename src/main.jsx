import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "src/pages/_routes";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./redux";
import "swiper/css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <NextUIProvider>
      <Toaster duration={3000} style={{ backgroundColor: "#D9D9D9" }} richColors={true} gap={2} />
      <Routes />
    </NextUIProvider>
  </Provider>
  // </React.StrictMode>
);
