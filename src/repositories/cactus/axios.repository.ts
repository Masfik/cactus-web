import { AxiosInstance } from "axios";

export abstract class AxiosRepository {
  constructor(protected axios: AxiosInstance) {
    if (axios.defaults.baseURL == null)
      axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    if (axios.defaults.headers["Content-Type"] === null)
      axios.defaults.headers["Content-Type"] = "application/json";
  }
}
