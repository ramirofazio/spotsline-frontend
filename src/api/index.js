import { BASE_API } from "./baseApi";

const route = {
  PRODUCT: "product",
  AUTH: "auth",
  USER: "user",
  CART: "shoppingCart",
  CHECKOUT: "checkout",
};

export const APISpot = {
  //? Rutas al backend POST, GET, PUT, etc...
  loginByJWT: ({ accessToken }) => {
    return BASE_API.post(`/${route.AUTH}/jwtAutoLogin`, { accessToken });
  },
};

//? JWT DATA FLOW
export function addAuthWithToken(token) {
  BASE_API.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
