import { configureStore } from "@reduxjs/toolkit";
import { authRdr, userRdr } from "./reducers";

export const store = configureStore({
  reducer: {
    auth: authRdr,
    user: userRdr
  },
});


