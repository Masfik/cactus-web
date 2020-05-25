interface AuthUser extends User {
  email: string;
  rooms?: Room[];
  invitations: Invitation[];
  blocked?: User[];
  preferences: Preferences;
}
