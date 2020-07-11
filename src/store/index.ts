import Vue from "vue";
import Vuex from "vuex";
import { authStore } from "@/store/modules/auth";
import { userStore } from "@/store/modules/user";
import { roomStore } from "@/store/modules/room";
import { streamStore } from "@/store/modules/stream";
import { dataWebSocketPlugin } from "@/store/plugins/data-websocket";

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
    roomStore,
    streamStore
  },
  plugins: [dataWebSocketPlugin()]
});
