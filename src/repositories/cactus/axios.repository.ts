import { AxiosInstance } from "axios";

export abstract class AxiosRepository {
  protected constructor(protected axios: AxiosInstance) {
    if (axios.defaults.baseURL == null)
      axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  }
}
