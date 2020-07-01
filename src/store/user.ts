import { AuthUser } from "@/models/auth-user";
import axios from "axios";
import { AuthService } from "@/services/auth/auth.service";
import { AuthServiceAdapter } from "@/services/auth/auth.service.adapter";
import { UserRepository } from "@/repositories/user.repository";
import { CactusUserRepository } from "@/repositories/cactus/cactus-user.repository";

// Authentication Service
const authService: AuthService = new AuthServiceAdapter();
// User Repository
const userRepository: UserRepository = new CactusUserRepository();

/***
 * Set a request interceptor to add a token to all HTTP requests performed by
 * the repositories (e.g. CactusUserRepository).
 *
 * @param token
 */
function setInterceptorToken(token: string) {
  axios.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });
}

export const userStore = {
  namespaced: true,
  state: {
    user: {} as AuthUser,
    loading: true
  },
  getters: {
    isAuthenticated: (state: any) => state.user.email != null
  },
  mutations: {
    setLoading: (state: any, loading: boolean) => (state.loading = loading),
    setUser: (state: any, authUser: AuthUser) => (state.user = authUser),
    setToken: (state: any, token: string) => (state.user.token = token)
  },
  actions: {
    onAuthStateChanged(
      { commit }: any,
      next: (authUser: AuthUser | null) => void
    ) {
      authService.onAuthStateChanged(next);
    },

    async loadUserData({ commit }: any, authUser: AuthUser) {
      setInterceptorToken(authUser.token);
      commit("setUser", await userRepository.getProfile());
      commit("setLoading", false);
    },

    updateToken(context: any, token: string) {
      context.commit("setToken", token);
      setInterceptorToken(token);
    },

    async login(context: any, email: string, password: string) {
      await authService.login(email, password);
    },

    async register(context: any, email: string, password: string) {
      const authUser = await authService.register(email, password);
      await userRepository.createUser(authUser as AuthUser);
    },

    reset({ commit }: any) {
      commit("setUser", {});
      commit("setLoading", false);
    }
  }
};
