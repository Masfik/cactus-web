import Vue from "vue";
import Vuex from "vuex";
import { authStore } from "@/store/modules/auth.store";
import { userStore } from "@/store/modules/user.store";
import { roomStore } from "@/store/modules/room.store";
import { streamStore } from "@/store/modules/stream.store";
import { ReconnectingWebsocketService } from "@/services/websocket/reconnecting-websocket.service";
import { userWebSocketPlugin } from "@/store/plugins/user-websocket";
import { roomWebSocketPlugin } from "@/store/plugins/room-websocket";

Vue.use(Vuex);

// Instantiating the WebSocket service
const webSocketService = new ReconnectingWebsocketService();

export default new Vuex.Store({
  state: {
    isConnectedToSocket: false
  },

  mutations: {
    setConnectedToSocket(state: any, isConnected: boolean) {
      state.isConnectedToSocket = isConnected;
    }
  },

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

  plugins: [
    userWebSocketPlugin(webSocketService),
    roomWebSocketPlugin(webSocketService)
  ]
});
