import { AuthUser } from "@/models/auth-user";
import { UserRepository } from "@/repositories/user.repository";
import { CactusUserRepository } from "@/repositories/cactus/cactus-user.repository";
import { User } from "@/models/user";

// User Repository
const userRepository: UserRepository = new CactusUserRepository();

export const userStore = {
  namespaced: true,

  state: {
    user: {} as AuthUser,
    isConnectedToSocket: false,
    usersFound: []
  },

  getters: {
    isDataLoaded: (state: any) => state.user.name != null,
    fullName: (state: any) => state.user.name + " " + state.user.surname,
    invitationsCount: (state: any) => state.user.invitations.length
  },

  mutations: {
    setUser: (state: any, authUser: AuthUser) => (state.user = authUser),
    setFoundUsers: (state: any, users: User[]) => (state.usersFound = users),
    setConnectedToSocket: (state: any, status: boolean) =>
      (state.isConnectedToSocket = status)
  },

  actions: {
    async loadUserData({ commit }: any) {
      commit("setUser", await userRepository.getProfile());
    },

    // Creating the user data (e.g. name, surname)
    async createUser(context: any, authUser: AuthUser) {
      await userRepository.createUser(authUser);
    },

    async search({ commit }: any, query: string) {
      commit("setFoundUsers", await userRepository.search(query));
    },

    async sendFriendRequest(context: any, user: User) {
      await userRepository.sendFriendRequest(user);
    },

    reset({ commit }: any) {
      commit("setUser", {});
    }
  }
};
