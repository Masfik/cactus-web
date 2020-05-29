interface User {
  id: string;
  name: string;
  surname: string;

  /**
   * Username from which the user can be searched.
   */
  username: string;

  /**
   * URL of the avatar
   */
  avatar: string;

  /**
   * Status: Online | Offline | Do Not Disturb.
   */
  status: UserStatus;

  /**
   * What the user is currently watching.
   */
  watching: string;

  /**
   * All friends of the user.
   */
  friends: User[];

  /**
   * Rooms of the user (in common).
   */
  rooms: Room[];
}
