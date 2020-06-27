import { UserRepository } from "@/repositories/user.repository";
import { AxiosInstance } from "axios";

class CactusUserRepository implements UserRepository {
  constructor(private axios: AxiosInstance) {
    if (axios.defaults.baseURL == null)
      axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  }

  getProfile = (): Promise<AuthUser> =>
    this.axios.get("/user").then(r => r.data as AuthUser);

  getFromUsername = (username: string): Promise<User | null> =>
    this.axios.get(`/user?username=${username}`).then(r => r.data as User);

  getFromId = (id: string): Promise<User> =>
    this.axios.get(`/user?id=${id}`).then(r => r.data as User);

  search = (query: string): Promise<User[]> =>
    this.axios.get(`/search?query=${query}`);
}
