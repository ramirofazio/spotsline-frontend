import { BASE_API } from "./baseApi";

const route = {
  PRODUCT: "products",
  AUTH: "auth",
  USER: "users",
  CART: "shoppingCart",
  CHECKOUT: "checkout",
};

export const APISpot = {

//TODO acomodar estos 3 pedidos igual que el auth, metidos en un objeto `products`
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
  //? Rutas al backend POST, GET, PUT, etc...
  auth: {
    loginByJWT: ({ accessToken }) => {
      return BASE_API.post(`/${route.AUTH}/jwtAutoLogin`, { accessToken });
    },
    signIn: (body) => {
      return BASE_API.post(`/${route.AUTH}/sign-in`, body);
    },
    firstTimePassword: (body) => {
      return BASE_API.patch(`/${route.AUTH}/first-time-password`, body);
    },
    initPasswordReset: (email) => {
      return BASE_API.patch(`/${route.AUTH}/init-password-reset`, { email });
    },
    confirmPasswordReset: ({ body }) => {
      return BASE_API.patch(`/${route.AUTH}/confirm-password-reset`, body);
    },
  },
  product: {
    _route: "product",
  },
  user: {
    _route: "user",
  },
  cart: {
    _route: "shoppingCart",
  },
  checkout: {
    _route: "checkout",
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
