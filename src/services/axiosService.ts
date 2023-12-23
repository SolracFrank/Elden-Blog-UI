import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ProblemDetails } from "../interfaces/httpInterfaces";
import Cookies from "universal-cookie";
import {
  getUserCookies,
  removeUserCookies,
  setUserCookies,
} from "../utils/authCookieSetter";

let isRefreshingToken = false;
type SubscriberCallback = (token: string) => void;

let subscribers: SubscriberCallback[] = [];

function addSubscriber(callback: SubscriberCallback) {
  subscribers.push(callback);
}

function onRefreshed(waitingFunction: string): void {
  subscribers.map((callback) => callback(waitingFunction));
  subscribers = [];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();
    const { jwToken: token } = getUserCookies(cookies);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const axiosError = error as AxiosError;
    const originalRequest = error.config;

    const cookies = new Cookies();

    if (axiosError.code === "ERR_NETWORK")
      toast.error("Connection error, try later");

    if (axiosError.response?.status === 500) {
      const problemDetail = axiosError.response?.data as ProblemDetails;
      toast.error(`${problemDetail.detail} ${problemDetail?.errors}`);

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const {
          userId,
          sessionDuration,
        } = getUserCookies(cookies);

        console.log("Trying yo refresh session");

        const sessionExpiricy = new Date(sessionDuration).getTime();

        if (Date.now() > sessionExpiricy) {
          subscribers = [];
          toast.error("Session expired, please try again");
          removeUserCookies(cookies);
          window.location.href = "/login";
          return Promise.reject(error);
        }
        if (!isRefreshingToken) {
          isRefreshingToken = true;
        }
        try {
          const res = await api.post("/v1/Auth/refresh-token", {
            userId
          });
          const newToken = res.data.jwToken;
          await setUserCookies({
            cookies: cookies,
            jwtExpires: res.data.jwtExpires,
            userId: userId,
            userName: res.data.userName,
            jwToken: newToken,
            sessionDuration: res.data.sessionDuration,
            email: res.data.email,
          });

          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          isRefreshingToken = false;
          onRefreshed(newToken);

          return api(originalRequest);
        } catch (err) {
          subscribers = [];
          isRefreshingToken = false;
          removeUserCookies(cookies);
          toast.error(
            "A unknown problem has occurred, please try again or contact our support"
          );
        }
      }

      return new Promise((resolve) => {
        addSubscriber((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          resolve(api(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  patch: api.patch,
};
