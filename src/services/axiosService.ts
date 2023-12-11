import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ProblemDetails } from "../interfaces/httpInterfaces";
import Cookies from "universal-cookie";
import { getUserCookies } from "../utils/authCookieSetter";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
    async (config) => {
      const cookies = new Cookies();
      const { jwToken: token } = getUserCookies(cookies);
    
      token ? config.headers.Authorization = `Bearer ${token}` : null;
      
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const axiosError = error as AxiosError;
    const originalRequest = error.config;

    const cookies = new Cookies();

    if (axiosError.code === "ERR_NETWORK")
      toast.error("Connection error, try later");

    if (axiosError.response?.status === 500) {
      const problemDetail = axiosError.response?.data as ProblemDetails;
      toast.error(`${problemDetail?.errors}`);
    }
  }
);

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  patch: api.patch,
};
