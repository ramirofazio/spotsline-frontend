import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { BASE_API } from "./baseApi";

const route = {
  PRODUCTS: "products",
  AUTH: "auth",
  USER: "users",
  CART: "shoppingCart",
  CHECKOUT: "mobbex",
};

export const APISpot = {
  product: {
    getAll: ({ take, page, search = null }) => {
      return BASE_API.get(`/${route.PRODUCTS}?take=${take}&&page=${page}&&search=${search}`);
    },
    getOne: ({ id }) => {
      return BASE_API.get(`/${route.PRODUCTS}/detail/${id}`);
    },
  },
  //TODO acomodar estos 3 pedidos igual que el auth, metidos en un objeto `products`
  getPaginatedProducts: (take, skip) => {
    return BASE_API.get(`/${route.PRODUCTS}/pag?take=${take}&&skip=${skip}`);
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

  user: {
    createOrder: async (body) => {
      const res = await BASE_API.post(`/${route.USER}/create-order`, body);
      return res.data;
    },
    getProfile: async () => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.get(`/${route.USER}/profile`);
      return res.data;
    },
    getOrders: async (id) => {
      const res = await BASE_API.get(`/${route.USER}/orders/${id}`);
      return res.data;
    },
    getOrder: async (id) => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.get(`/${route.USER}/order/${id}`);
      return res.data;
    },
    updateData: async (body) => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.post(`/${route.USER}/update-data`, body);
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
