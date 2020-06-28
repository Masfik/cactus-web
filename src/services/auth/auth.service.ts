import { AuthUser } from "@/models/auth-user";

export interface AuthService {
  login(email: string, password: string): Promise<AuthUser | null>;

  register(email: string, password: string): Promise<AuthUser | null>;

  logout(): Promise<void>;

  onAuthStateChanged(next: (authUser: AuthUser | null) => void): void;
}
