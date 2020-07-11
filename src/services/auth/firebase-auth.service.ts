import * as firebase from "firebase/app";
import "firebase/auth";
import { AuthService } from "@/services/auth/auth.service";
import { AuthUser } from "@/models/auth-user";

export class FirebaseAuthService implements AuthService {
  private auth: firebase.auth.Auth;

  constructor() {
    const firebaseApp = firebase.initializeApp({
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID
    });
    this.auth = firebaseApp.auth();
  }

  login(email: string, password: string): Promise<AuthUser | null> {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => FirebaseAuthService.toAuthUser(user));
  }

  register(email: string, password: string): Promise<AuthUser | null> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => FirebaseAuthService.toAuthUser(user));
  }

  logout = (): Promise<void> => this.auth.signOut();

  onAuthStateChanged(next: (authUser: AuthUser | null) => void) {
    this.auth.onIdTokenChanged(async firebaseUser =>
      next(await FirebaseAuthService.toAuthUser(firebaseUser))
    );
  }

  private static async toAuthUser(
    firebaseUser: firebase.User | null
  ): Promise<AuthUser | null> {
    if (firebaseUser === null) return null;
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      token: await firebaseUser.getIdToken()
    } as AuthUser;
  }
}
