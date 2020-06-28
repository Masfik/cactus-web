import { UserRepository } from "@/repositories/user.repository";
import { AuthUser } from "@/models/auth-user";
import { User } from "@/models/user";
import { AxiosRepository } from "@/repositories/cactus/axios.repository";

class CactusUserRepository extends AxiosRepository implements UserRepository {
  getProfile = async (): Promise<AuthUser> =>
    (await this.axios.get("/user")).data;

  getFromUsername = async (username: string): Promise<User | null> =>
    (await this.axios.get(`/user?username=${username}`)).data;

  getFromId = async (id: string): Promise<User> =>
    (await this.axios.get(`/user?id=${id}`)).data;

  search = async (query: string): Promise<User[]> =>
    (await this.axios.get(`/user?search=${query}`)).data;

  createUser = async (authUser: AuthUser): Promise<AuthUser> =>
    (await this.axios.post("/user", authUser)).data;

  register = (authUser: AuthUser) => this.createUser(authUser);
}
