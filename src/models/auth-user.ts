interface AuthUser extends User {
  email: string;

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
