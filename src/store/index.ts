import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // TODO: temporary
    isUserAuthenticated: false
  },
  mutations: {},
  actions: {},
  modules: {
    userStore
  }
});
