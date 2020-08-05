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
    usersFound: []
  },

  getters: {
    isDataLoaded: (state: any) => state.user.name != null,
    fullName: (state: any) => state.user.name + " " + state.user.surname,
    invitationsCount: (state: any) => state.user.invitations.length
  },

  mutations: {
    setUser: (state: any, authUser: AuthUser) => (state.user = authUser),
    setFoundUsers: (state: any, users: User[]) => (state.usersFound = users)
  },

  actions: {
    async loadUserData({ commit, dispatch }: any) {
      const profileData = await userRepository.getProfile();

      // Adding rooms to the roomStore
      dispatch("roomStore/setRooms", profileData.rooms, { root: true });

      // Removing rooms from the data (the roomStore now holds them)
      delete profileData.rooms;

      commit("setUser", profileData);
    },

    // Creating the user data (e.g. name, surname)
    async createUser(context: any, authUser: AuthUser) {
      await userRepository.createUser(authUser);
    },

    async search({ commit }: any, query: string) {
      commit("setFoundUsers", await userRepository.search(query));
    },

    resetUsersFound({ commit }: any) {
      commit("setFoundUsers", []);
    },

    async sendFriendRequest(context: any, user: User) {
      await userRepository.sendFriendRequest(user);
    },

    reset({ commit, dispatch }: any) {
      commit("setUser", {});
      dispatch("resetUsersFound");
    }
  }
};
