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
  ORDERS: "orders",
  MAIL: "mailing",
  CURRENT_ACCOUNT: "current-account",
};

export const APISpot = {
  seller: {
    getManagedClients: () => {
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.get(`/${route.CLIENTS}/managed-clients`);
    },
  },
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
    getDashboardOrders: async () => {
      const res = await BASE_API.get(`/${route.ORDERS}/`);
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
      addAuthWithToken(getOfStorage("access_token"));
      return BASE_API.post(`/${route.AWS}/productImg/${variant_id}`, formData, {
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
    getAll: ({ take, page, search = "", category = "", order = "" }) => {
      return BASE_API.get(
        `/${route.PRODUCTS}?take=${take}&&page=${page}&&search=${search}&&category=${category}&&order=${order}`
      );
    },
    getOne: async ({ id }) => {
      const res = await BASE_API.get(`/${route.PRODUCTS}/detail/${id}`);

      return res.data;
    },
    getFeaturedProducts: async () => {
      const res = await BASE_API.get(`/${route.PRODUCTS}/featured`);
      return res.data;
    },
    getPaginatedProducts: (take, skip) => {
      return BASE_API.get(`/${route.PRODUCTS}/pag?take=${take}&&skip=${skip}`);
    },
    getCategories: async () => {
      const res = await BASE_API.get(`/${route.PRODUCTS}/categories`);
      saveInStorage("categories", res.data);
      return res.data;
    },
  },
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
    createEmptyCart: async (userId) => {
      const res = await BASE_API.post(`/${route.CART}`, {
        userId: userId,
        discount: 0,
        subtotal: 0,
        total: 0,
        coupon: false,
        items: [],
      });
      return res.data;
    },
    validateCoupon: async (coupon) => {
      const res = await BASE_API.get(`/${route.COUPON}/validate/${coupon}`);
      return res.data;
    },
    createCart: async (body) => {
      const res = await BASE_API.post(`/${route.CART}`, body);
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
    getCurrentAccounts: async () => {
      addAuthWithToken(getOfStorage("access_token"));
      //ACA
      const localUser = getOfStorage("user");
      const managedClient = getOfStorage("managedClient");
      let id;

      if (localUser.web_role === Number(import.meta.env.VITE_SELLER_ROLE)) {
        //? Es vendedor
        id = Number(managedClient.id);
      } else {
        //? Es user normal
        id = localUser.id;
      }
      const res = await BASE_API.get(`/${route.CURRENT_ACCOUNT}/one/${id}`);
      return res.data;
    },

    getProfile: async () => {
      addAuthWithToken(getOfStorage("access_token"));
      //ACA
      const localUser = getOfStorage("user");
      const managedClient = getOfStorage("managedClient");
      let id;

      if (localUser.web_role === Number(import.meta.env.VITE_SELLER_ROLE)) {
        //? Es vendedor
        id = Number(managedClient.id);
      } else {
        //? Es user normal
        id = localUser.id;
      }

      const res = await BASE_API.get(`/${route.USER}/profile/${id}`);
      return res.data;
    },
    getOrders: async () => {
      addAuthWithToken(getOfStorage("access_token"));
      //ACA
      const localUser = getOfStorage("user");
      const managedClient = getOfStorage("managedClient");
      let id;

      if (localUser.web_role === Number(import.meta.env.VITE_SELLER_ROLE)) {
        //? Es vendedor
        id = Number(managedClient.id);
      } else {
        //? Es user normal
        id = localUser.id;
      }

      const res = await BASE_API.get(`/${route.USER}/orders/${id}`);
      return res.data;
    },
    getOrder: async ({ order_id, user_id }) => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.post(`/${route.USER}/one-order`, {
        order_id,
        user_id,
      });
      return res.data;
    },
    updateData: async (body) => {
      addAuthWithToken(getOfStorage("access_token"));
      const res = await BASE_API.post(`/${route.USER}/update-data`, body);
      return res.data;
    },
    updateAvatar: ({ userId, web_role, formData }) => {
      return BASE_API.post(`/${route.AWS}/avatar/${userId}?web_role=${web_role}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },
  mail: {
    sendRrhhRequest: async (body) => {
      return BASE_API.post(`/${route.MAIL}/rrhh`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
