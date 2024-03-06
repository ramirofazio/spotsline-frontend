import axios from "axios";

export const BASE_API = axios.create({
  maxBodyLength: 750000000,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 2000,
});

BASE_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Se ha superado el tiempo de espera
      return Promise.reject(new Error("No se pudo conectar con el backend"));
    }
    return Promise.reject(error);
  }
);
