import { WebRTCStreamService } from "@/services/stream/webrtc-stream.service";

// Service to stream the screen
const streamScreenService /*: StreamScreenService*/ = new WebRTCStreamService();

export const streamStore = {
  namespaced: true,

  state: {
    stream: null,
    localPeerConnection: null,
    remotePeerConnection: null,
    channel: null // sendChannel; receiveChannel;
  },

  getters: {
    isStreaming: (state: any) => state.stream !== null
  },

  mutations: {
    setStream: (state: any, stream: MediaStream) => (state.stream = stream),

    setLocalPeerConnection: (state: any, connection: RTCPeerConnection) =>
      (state.localPeerConnection = connection),

    setRemotePeerConnection: (state: any, connection: RTCPeerConnection) =>
      (state.remotePeerConnection = connection),

    setChannel: (state: any, channel: RTCDataChannel) =>
      (state.channel = channel)
  },

  actions: {
    async startStream({ commit }: any) {
      const stream = await streamScreenService.startStream();
      commit("setStream", stream);
      stream.oninactive = () => commit("setStream", null);
    },

    endStream() {
      streamScreenService.endStream();
    },

    createPeerConnection({ state, commit }: any) {
      commit("setLocalPeerConnection", new RTCPeerConnection());
      const localPeerConnection = state.localPeerConnection as RTCPeerConnection;

      localPeerConnection.onicecandidate =
        streamScreenService.onConnectionIceEvent;

      commit("setChannel", localPeerConnection.createDataChannel("main"), {
        ordered: true
      });

      console.log(localPeerConnection);
    }
  }
};
