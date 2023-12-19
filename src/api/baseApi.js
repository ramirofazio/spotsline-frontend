import axios from "axios";

export const BASE_API = axios.create({
  maxBodyLength: 750000000,
  baseURL: import.meta.API_URL,
});
