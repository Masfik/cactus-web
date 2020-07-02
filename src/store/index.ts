import Vue from "vue";
import Vuex from "vuex";
import { authStore } from "@/store/auth";
import { userStore } from "@/store/user";
import { roomStore } from "@/store/room";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    reset({ dispatch }) {
      dispatch("authStore/reset");
      dispatch("userStore/reset");
    }
  },
  modules: {
    authStore,
    userStore,
    roomStore
  }
});
