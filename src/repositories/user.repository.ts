import { AuthUser } from "@/models/auth-user";
import { User } from "@/models/user";

export interface UserRepository {
  /**
   * Get the full profile of the currently authenticated user.
   * @return Promise<AuthUser>
   */
  getProfile(): Promise<AuthUser>;

  /**
   * Get the user from a username.
   * Returns null if no user was found.
   *
   * @param username
   * @return Promise<User | null>
   */
  getFromUsername(username: string): Promise<User | null>;

  /**
   * Get the user from an ID.
   * This method should throw and exception when no result is found because
   * the user will likely avoid searching by ID  — only the script should
   * automatically make use of this function and, in most cases, succeed.
   *
   * @param id
   * @return Promise<User>
   */
  getFromId(id: string): Promise<User>;

  /**
   * Search users by providing a string.
   * Returns an array of users found by the matching string.
   *
   * @param query
   * @return Promise<User[]>
   */
  search(query: string): Promise<User[]>;
}
