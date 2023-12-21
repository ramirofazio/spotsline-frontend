import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "pages/routes";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <Routes />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
