import firebase from "firebase/app";

export class FirebaseAuthService implements AuthService {
  private auth = firebase.auth();

  constructor() {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    });
  }

  async login(email: string, password: string): Promise<AuthUser | null> {
    return await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => FirebaseAuthService.toAuthUser(user));
  }

  async register(email: string, password: string): Promise<AuthUser | null> {
    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => FirebaseAuthService.toAuthUser(user));
  }

  logout = async (): Promise<void> => await this.auth.signOut();

  onAuthStateChanged(next: (authUser: AuthUser | null) => void) {
    this.auth.onAuthStateChanged(firebaseUser =>
      next(FirebaseAuthService.toAuthUser(firebaseUser))
    );
  }

  private static toAuthUser(
    firebaseUser: firebase.User | null
  ): AuthUser | null {
    if (firebaseUser === null) return null;
    return <AuthUser>{
      id: firebaseUser.uid,
      email: firebaseUser.email
    };
  }
}
