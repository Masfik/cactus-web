import { UserRepository } from "@/repositories/user.repository";
import { AuthUser } from "@/models/auth-user";
import { User } from "@/models/user";
import { AxiosRepository } from "@/repositories/cactus/axios.repository";

export class CactusUserRepository extends AxiosRepository
  implements UserRepository {
  getProfile = async (): Promise<AuthUser> =>
    (await this.axiosInstance.get("/user")).data;

  getFromUsername = async (username: string): Promise<User | null> =>
    (await this.axiosInstance.get(`/user?username=${username}`)).data;

  getFromId = async (id: string): Promise<User> =>
    (await this.axiosInstance.get(`/user?id=${id}`)).data;

  search = async (query: string): Promise<User[]> =>
    (await this.axiosInstance.get(`/user/search?query=${query}`)).data;

  createUser = async (authUser: AuthUser): Promise<AuthUser> =>
    (await this.axiosInstance.post("/user", authUser)).data;

  register = (authUser: AuthUser) => this.createUser(authUser);
}
