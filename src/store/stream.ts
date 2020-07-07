import { StreamScreenService } from "@/services/screensharing/stream-screen.service";
import { WebRTCService } from "@/services/screensharing/webrtc.service";

// Service to stream the screen
const streamScreenService: StreamScreenService = new WebRTCService();

export const streamStore = {
  namespaced: true,

  state: {
    stream: null
  },

  getters: {
    isStreaming: (state: any) => state.stream !== null
  },

  mutations: {
    setStream: (state: any, stream: MediaStream) => (state.stream = stream)
  },

  actions: {
    async startStream({ commit }: any) {
      const stream = await streamScreenService.startStream();
      commit("setStream", stream);
      stream.oninactive = () => commit("setStream", null);
    },

    endStream() {
      streamScreenService.endStream();
    }
  }
};
