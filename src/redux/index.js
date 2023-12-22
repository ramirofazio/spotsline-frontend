import { configureStore } from "@reduxjs/toolkit";
import { authRdr } from "./reducers";

export const store = configureStore({
  reducer: {
    auth: authRdr,
  },
});


