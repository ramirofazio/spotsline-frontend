import { configureStore } from "@reduxjs/toolkit";
import { authRdr, productRdr, userRdr } from "./reducers";

export const store = configureStore({
  reducer: {
    auth: authRdr,
    user: userRdr,
    product: productRdr,
  },
});
