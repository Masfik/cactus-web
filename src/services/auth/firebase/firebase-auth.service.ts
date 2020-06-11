import firebase from "firebase/app";

class FirebaseAuthService {
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
    return FirebaseAuthService.toAuthUser(
      await this.auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => user)
        .catch(() => null)
    );
  }

  async register(email: string, password: string): Promise<AuthUser | null> {
    return FirebaseAuthService.toAuthUser(
      await this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => user)
        .catch(() => null)
    );
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  private static toAuthUser(firebaseUser: firebase.User | null): AuthUser {
    return <AuthUser>{
      id: firebaseUser?.uid,
      email: firebaseUser?.email
    };
  }
}
