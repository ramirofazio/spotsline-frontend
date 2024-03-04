import { saveInStorage } from "src/utils/localStorage";
import { BASE_API } from "./baseApi";

const route = {
  PRODUCTS: "products",
  AUTH: "auth",
  USER: "users",
  CART: "shoppingCart",
  CHECKOUT: "mobbex",
};

export const APISpot = {
  //TODO acomodar estos 3 pedidos igual que el auth, metidos en un objeto `products`
  getPaginatedProducts: async (take, skip) => {
    const res = await BASE_API.get(`/${route.PRODUCTS}/pag?take=${take}&&skip=${skip}`);
    return res.data;
  },
  getCategories: async () => {
    const res = await BASE_API.get(`/${route.PRODUCTS}/categories`);
    saveInStorage("categories", res.data);

    return res.data;
  },

  //? Rutas al backend POST, GET, PUT, etc...
  auth: {
    jwtAutoSignIn: async (body) => {
      const res = await BASE_API.post(`/${route.AUTH}/jwt-auto-sign-in`, body);
      return res.data;
    },
    signIn: async (body) => {
      const res = await BASE_API.post(`/${route.AUTH}/sign-in`, body);
      return res.data;
    },
    firstTimePassword: async (body) => {
      const res = await BASE_API.patch(`/${route.AUTH}/first-time-password`, body);
      return res.data;
    },
    initPasswordReset: async (email) => {
      const res = await BASE_API.post(`/${route.AUTH}/init-password-reset`, { email });
      return res.data;
    },
    confirmPasswordReset: async (body) => {
      const res = await BASE_API.patch(`/${route.AUTH}/confirm-password-reset`, body);
      return res.data;
    },
  },
  product: {},
  user: {},
  cart: {
    validateCoupon: async (coupon) => {
      const res = await BASE_API.get(`/${route.CART}/validate-coupon`, { coupon });
      return res.data;
    },
  },
  checkout: {
    create: async (body) => {
      const res = await BASE_API.post(`/${route.CHECKOUT}/checkout`, body);
      return res.data;
    },
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

export function removeAuthWithToken() {
  BASE_API.interceptors.request.use(
    (config) => {
      config.headers.Authorization = "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
