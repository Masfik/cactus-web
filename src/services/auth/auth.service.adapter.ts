import { AuthService } from "@/services/auth/auth.service";
import { FirebaseAuthService } from "@/services/auth/firebase-auth.service";
import { AuthUser } from "@/models/auth-user";

export class AuthServiceAdapter implements AuthService {
  private authService: AuthService;

  constructor() {
    switch (process.env.VUE_APP_AUTH_SERVICE) {
      case "firebase":
        this.authService = new FirebaseAuthService();
        break;
      case "default":
      default:
        this.authService = {} as AuthService; // TODO: will create in the future
    }
  }

  login = (email: string, password: string) =>
    this.authService.login(email, password);

  register = (email: string, password: string) =>
    this.authService.register(email, password);

  logout = () => this.authService.logout();

  onAuthStateChanged = (next: (authUser: AuthUser | null) => void) =>
    this.authService.onAuthStateChanged(next);
}
