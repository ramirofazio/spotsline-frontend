import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { BASE_API } from "./baseApi";

const route = {
  PRODUCTS: "products",
  AUTH: "auth",
  SELLERS: "sellers",
  CLIENTS: "clients",
  USER: "users",
  CART: "shopping-cart",
  CHECKOUT: "mobbex",
  COUPON: "coupon",
  AWS: "aws-s3-upload",
};

export const APISpot = {
  dashboard: {
    getDashboardSellers: async () => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.get(`/${route.SELLERS}/dashboard-sellers`);
      return res.data;
    },
    addSellerEmail: (body) => {
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.patch(`/${route.SELLERS}/add-email`, body);
    },
    addClientEmail: (body) => {
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.patch(`/${route.CLIENTS}/add-email`, body);
    },
    getDashboardClients: async (page) => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.get(`/${route.CLIENTS}/dashboard-clients?page=${page}`);
      return res.data;
    },
    getDashboardProductVariants: async (productCode) => {
      const res = await BASE_API.get(`/${route.PRODUCTS}/dashboard-product-variants?productCode=${productCode}`);
      return res.data;
    },
    getDashboardProducts: async (page) => {
      const res = await BASE_API.get(`/${route.PRODUCTS}/dashboard-products?page=${page}`);
      return res.data;
    },
    toggleFeaturedProduct: (body) => {
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.patch(`/${route.PRODUCTS}/edit_featured`, body);
    },
    toggleIncluidoVariant: (productCode) => {
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.patch(`/${route.PRODUCTS}/toggleIncluido?productCode=${productCode}`);
    },
    updateProductImages: (variant_id, formData) => {
      //TODO Chequear ruta
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.post(`/${route.AWS}/${variant_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    getCoupons: async () => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.get(`/${route.COUPON}`);
      return res.data;
    },
    createCoupon: (body) => {
      return BASE_API.post(`/${route.COUPON}/create`, body);
    },
    removeCoupon: (coupon_id) => {
      return BASE_API.delete(`/${route.COUPON}/delete/${coupon_id}`);
    },
    toggleStateCoupon: (coupon_id) => {
      return BASE_API.patch(`/${route.COUPON}/change_state`, { id: coupon_id });
    },
  },

  product: {
    getAll: ({ take, page, search = null }) => {
      return BASE_API.get(`/${route.PRODUCTS}?take=${take}&&page=${page}&&search=${search}`);
    },
    getOne: ({ id }) => {
      return BASE_API.get(`/${route.PRODUCTS}/detail/${id}`);
    },
    getFeaturedProducts: ({ take }) => {
      return BASE_API.get(`/${route.PRODUCTS}/featured?take=${take}`);
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
      const res = await BASE_API.get(`/${route.COUPON}/validate/${coupon}`);
      return res.data;
    },
    createCart: async (shoppingCart) => {
      const res = await BASE_API.post(`/${route.CART}`, shoppingCart);
      return res.data;
    },
    updateCart: async (shoppingCart) => {
      const res = await BASE_API.put(`/${route.CART}/update`, shoppingCart);
      return res.data;
    },
    deleteCart: async (userId, force) => {
      const res = await BASE_API.delete(`/${route.CART}/delete/${userId}?force=${Boolean(force)}`);
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
