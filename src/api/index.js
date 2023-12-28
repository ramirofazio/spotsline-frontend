import { BASE_API } from "./baseApi";

const route = {
  PRODUCT: "products",
  AUTH: "auth",
  USER: "users",
  CART: "shoppingCart",
  CHECKOUT: "checkout",
};

export const APISpot = {
  getPaginatedProducts: async (take, skip) => {
    const res = await BASE_API.get(`/${route.PRODUCT}/pag?take=${take}&&skip=${skip}`);
    return res.data;
  },

  getCategories: () => {
    return BASE_API.get(`/`);
  },
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
