import axios from "axios";
import { AuthService } from "@/services/auth/auth.service";
import { AuthServiceAdapter } from "@/services/auth/auth.service.adapter";
import { AuthUser } from "@/models/auth-user";

// Authentication Service
const authService: AuthService = new AuthServiceAdapter();

/***
 * Set a request interceptor to add a token to all HTTP requests performed by
 * the repositories (e.g. CactusUserRepository and CactusRoomRepository).
 *
 * @param token
 */
function setInterceptorToken(token: string) {
  axios.defaults.headers.authorization = `Bearer ${token}`;
}

export const authStore = {
  namespaced: true,

  state: {
    authUser: {
      email: null,
      token: null
    }
  },

  getters: {
    isAuthenticated: (state: any) => state.authUser.email != null
  },

  mutations: {
    setUser(state: any, user: { email: string; token: string }) {
      state.authUser = user;
    }
  },

  actions: {
    async login(context: any, payload: { email: string; password: string }) {
      await authService.login(payload.email, payload.password);
    },

    async register(
      { dispatch }: any,
      payload: {
        email: string;
        password: string;
        name: string;
        surname: string;
        username: string;
      }
    ) {
      // Registering the user
      const authUser = (await authService.register(
        payload.email,
        payload.password
      )) as AuthUser;

      setInterceptorToken(authUser.token);

      // Dispatching the user creation action from the User Store
      await dispatch(
        "userStore/createUser",
        {
          ...authUser,
          name: payload.name,
          surname: payload.surname,
          username: payload.username
        } as AuthUser,
        { root: true }
      );
    },

    async logout() {
      await authService.logout();
    },

    setUser({ commit }: any, authUser: { email: string; token: string }) {
      commit("setUser", authUser);
      setInterceptorToken(authUser.token);
    },

    onAuthStateChanged(ctx: any, next: (authUser: AuthUser | null) => void) {
      authService.onAuthStateChanged(authUser => {
        if (authUser != null) ctx.dispatch("setUser", authUser);
        next(authUser);
      });
    },

    reset({ commit }: any) {
      commit("setUser", {});
    }
  }
};
