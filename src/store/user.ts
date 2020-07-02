import { AuthUser } from "@/models/auth-user";
import { UserRepository } from "@/repositories/user.repository";
import { CactusUserRepository } from "@/repositories/cactus/cactus-user.repository";

// User Repository
const userRepository: UserRepository = new CactusUserRepository();

export const userStore = {
  namespaced: true,

  state: {
    user: {} as AuthUser
  },

  getters: {
    isDataLoaded: (state: any) => state.user.name != null,
    fullName: (state: any) => state.user.name + " " + state.user.surname
  },

  mutations: {
    setUser: (state: any, authUser: AuthUser) => (state.user = authUser)
  },

  actions: {
    async loadUserData({ commit }: any) {
      commit("setUser", await userRepository.getProfile());
    },

    // Creating the user data (e.g. name, surname)
    async createUser(context: any, authUser: AuthUser) {
      await userRepository.createUser(authUser);
    },

    reset({ commit }: any) {
      commit("setUser", {});
    }
  }
};
