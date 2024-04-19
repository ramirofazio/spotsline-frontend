import { configureStore } from "@reduxjs/toolkit";
import { authRdr, shoppingCartRdr, userRdr, productRdr, sellerRdr } from "./reducers";

export const store = configureStore({
  reducer: {
    auth: authRdr,
    user: userRdr,
    cart: shoppingCartRdr,
    product: productRdr,
    seller: sellerRdr,
  },
});
