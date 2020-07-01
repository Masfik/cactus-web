import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserAuthenticated: null
  },
  mutations: {
    setAuthenticated(state: any, status: boolean) {
      state.isUserAuthenticated = status;
    }
  },
  actions: {},
  // TODO: change this when there is better TypeScript support
  modules: {
    userStore
  }
});
