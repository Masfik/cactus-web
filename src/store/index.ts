import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserAuthenticated: null
  },
  mutations: {},
  actions: {},
  modules: {
    userStore
  }
});
