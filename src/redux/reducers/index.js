export { authRdr } from "./auth.js";
import { setAccessToken, cleanAuth } from "./auth.js";
export const actionsAuth = {
  setAccessToken,
  cleanAuth,
};

export { userRdr } from "./user.js";
import { setUser, cleanUser } from "./user.js";
export const actionsUser = {
  setUser,
  cleanUser,
};

export { productRdr } from "./product.js";

export * as actionProducts from "./product.js";
