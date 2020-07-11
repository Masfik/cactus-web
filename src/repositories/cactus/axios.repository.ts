import axios, { AxiosInstance } from "axios";

export abstract class AxiosRepository {
  constructor(protected axiosInstance: AxiosInstance = axios) {
    if (axiosInstance.defaults.baseURL == null)
      axiosInstance.defaults.baseURL =
        (process.env.NODE_ENV === "development" ? "http://" : "https://") +
        process.env.VUE_APP_API_URL;
    if (axiosInstance.defaults.headers["Content-Type"] === null)
      axiosInstance.defaults.headers["Content-Type"] = "application/json";
  }
}
