import { AuthUser } from "@/models/auth-user";
import { User } from "@/models/user";

export interface UserRepository {
  /**
   * Get the full profile of the currently authenticated user.
   *
   * @return Promise<AuthUser>
   */
  getProfile(): Promise<AuthUser>;

  /**
   * Get the user from a username.
   *
   * @param username
   * @returns User or null if no user was found
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
   *
   * @param query
   * @returns an array of users found by the matching string.
   */
  search(query: string): Promise<User[]>;

  /**
   * Create a user.
   *
   * @param authUser
   * @returns sanitised AuthUser (e.g. lowercase E-Mail) and additional data.
   */
  createUser(authUser: AuthUser): Promise<AuthUser>;

  /**
   * Alias of #createUser().
   *
   * @param authUser
   * @alias createUser
   */
  register(authUser: AuthUser): Promise<AuthUser>;
}
