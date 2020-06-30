import { Invitation } from "@/models/invitation";
import { User } from "@/models/user";
import { Preferences } from "@/models/preferences";

export interface AuthUser extends User {
  email: string;
  token: string;

  /**
   * Invitations received (e.g. friend request or room join invitation)
   */
  invitations: Invitation[];

  /**
   * List of blocked users.
   */
  blocked?: User[];

  /**
   * Preferences of the user.
   */
  preferences: Preferences;
}
