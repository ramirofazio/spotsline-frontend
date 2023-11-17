import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const BASE_API = axios.create({
  maxBodyLength: 750000000,
  baseURL: API_URL,
  headers: {
    // ? Configuracion las cabeceras CORS
    "Access-Control-Allow-Origin": import.meta.env.VITE_ACCESS_URL,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
  },
});
