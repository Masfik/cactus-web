import { UserRepository } from "@/repositories/user.repository";
import { AuthUser } from "@/models/auth-user";
import { User } from "@/models/user";
import { AxiosRepository } from "@/repositories/cactus/axios.repository";

class CactusUserRepository extends AxiosRepository implements UserRepository {
  getProfile = (): Promise<AuthUser> =>
    this.axios.get("/user").then(r => r.data as AuthUser);

  getFromUsername = (username: string): Promise<User | null> =>
    this.axios.get(`/user?username=${username}`).then(r => r.data as User);

  getFromId = (id: string): Promise<User> =>
    this.axios.get(`/user?id=${id}`).then(r => r.data as User);

  search = (query: string): Promise<User[]> =>
    this.axios.get(`/search?query=${query}`).then(r => r.data as User[]);
}
