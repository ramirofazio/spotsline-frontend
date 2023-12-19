import { BASE_API } from "./baseApi";

export const APISpot = {
  //? Rutas al backend POST, GET, PUT, etc...
  auth: {
    _route: "auth",
    loginByJWT: ({ accessToken }) => {
      return BASE_API.post(`/${this._route}/jwtAutoLogin`, { accessToken });
    },
    firstTimePassword: (body) => {
      return BASE_API.patch(`/${this._route}/first-time-password`, body);
    },
    initPasswordReset: (email) => {
      return BASE_API.patch(`/${this._route}/init-password-reset`, { email });
    },
    confirmPasswordReset: (body) => {
      return BASE_API.patch(`/${this._route}/confirm-password-reset`, body);
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
