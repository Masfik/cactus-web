import { StreamScreenService } from "@/services/stream/stream-screen.service";
import { WebRTCStreamService } from "@/services/stream/webrtc-stream.service";

// Service to stream the screen
const streamScreenService: StreamScreenService = new WebRTCStreamService();

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
