interface AuthService {
  login(email: string, password: string): Promise<AuthUser | null>;

  register(email: string, password: string): Promise<AuthUser | null>;

  logout(): Promise<void>;
}
