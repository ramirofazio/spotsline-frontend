export { authRdr } from "./auth.js";
import { setToken } from "./auth.js";
export const actionsAuth = {
  setToken,
};

export { userRdr } from "./user.js";
import { setUser } from "./user.js";
export const actionsUser = {
  setUser,
};

export { productRdr } from "./product.js";

export * as actionProducts from "./product.js";
