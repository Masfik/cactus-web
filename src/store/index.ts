import Vue from "vue";
import Vuex from "vuex";
import { authStore } from "@/store/modules/auth.store";
import { userStore } from "@/store/modules/user.store";
import { roomStore } from "@/store/modules/room.store";
import { streamStore } from "@/store/modules/stream.store";
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
