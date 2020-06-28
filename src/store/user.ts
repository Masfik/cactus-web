import { AuthUser } from "@/models/auth-user";

export const userStore = {
  namespaced: true,
  state: {
    user: {} as AuthUser
  },
  getters: {
    isAuthenticated: (state: any) => state.user.email != null
  },
  mutations: {},
  actions: {}
};
