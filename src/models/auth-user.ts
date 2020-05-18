interface AuthUser extends User {
  email: string;
  groups?: Room[];
  invitations: Invitation[];
  blocked?: User[];
  preferences: Preferences;
}
