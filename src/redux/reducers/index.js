export { authRdr } from "./auth.js";
import { setAccessToken } from "./auth.js";
export const actionsAuth = {
  setAccessToken,
};

export { userRdr } from "./user.js";
import { setUser } from "./user.js";
export const actionsUser = {
  setUser,
};
