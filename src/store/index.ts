import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "@/store/user";
import { roomStore } from "@/store/room";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    roomStore
  }
});
