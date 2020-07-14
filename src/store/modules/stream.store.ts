import { WebRTCStreamService } from "@/services/stream/webrtc-stream.service";

// Service to stream the screen
const streamScreenService = new WebRTCStreamService();

export const streamStore = {
  namespaced: true,

  state: {
    isStreamer: false,
    stream: null as MediaStream | null,
    localPeerConnection: null as RTCPeerConnection | null,
    channel: null as RTCDataChannel | null, // sendChannel; receiveChannel;
    iceCandidate: null as RTCIceCandidate | null,
    offer: null as RTCOfferOptions | null,
    answer: null as RTCSessionDescriptionInit | null
  },

  getters: {
    isStreaming: (state: any) => state.stream !== null
  },

  mutations: {
    setUserAsStreamer: (state: any, isStreamer: boolean) =>
      (state.isStreamer = isStreamer),

    setStream: (state: any, stream: MediaStream) => (state.stream = stream),

    setLocalPeerConnection: (state: any, connection: RTCPeerConnection) =>
      (state.localPeerConnection = connection),

    setChannel: (state: any, channel: RTCDataChannel) =>
      (state.channel = channel),

    setIceCandidate: (state: any, candidate: RTCIceCandidate) =>
      (state.iceCandidate = candidate),

    setOffer: (state: any, offer: RTCOfferOptions) => (state.offer = offer),

    setAnswer: (state: any, answer: RTCAnswerOptions) => (state.answer = answer)
  },

  actions: {
    async startStream({ commit, dispatch }: any) {
      const stream = await streamScreenService.startStream();
      commit("setStream", stream);
      commit("setUserAsStreamer", true);
      stream.oninactive = () => dispatch("endStream");
    },

    endStream({ state, commit }: any) {
      commit("setStream", null);
      streamScreenService.endStream();
      state.channel.close();
      state.localPeerConnection.close();
    },

    createPeerConnection({ state, commit }: any) {
      commit("setLocalPeerConnection", new RTCPeerConnection());
      const localPeerConnection = state.localPeerConnection as RTCPeerConnection;

      localPeerConnection.onicecandidate = event => {
        console.log(event.candidate);

        if (state.isStreamer) {
          const iceCandidate = event.candidate;
          if (!iceCandidate) return;

          commit(
            "setIceCandidate",
            new RTCIceCandidate(iceCandidate as RTCIceCandidateInit)
          );
        }
      };

      localPeerConnection.addEventListener("connectionstatechange", event => {
        if (localPeerConnection.connectionState === "connected") {
          console.log("Connected!");
        }
      });

      if (state.isStreamer) {
        commit(
          "setChannel",
          localPeerConnection.createDataChannel("main", {
            ordered: true
          })
        );

        state.channel.onopen = () => console.log("On open");
        state.channel.onclose = () => console.log("On close");
        state.channel.onerror = () => console.log("On error");
      } else {
        localPeerConnection.ontrack = e => commit("setStream", e.streams[0]);

        localPeerConnection.ondatachannel = e => {
          commit("setChannel", e.channel);
          state.channel!.onmessage = console.info;
        };
      }
    },

    async createOffer({ state, commit }: any) {
      const localPeerConnection = state.localPeerConnection as RTCPeerConnection;

      const offer = await localPeerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });

      await localPeerConnection.setLocalDescription(offer);
      commit("setOffer", offer);
    },

    async createAnswer({ state, commit }: any) {
      const localPeerConnection = state.localPeerConnection as RTCPeerConnection;
      const answer = await localPeerConnection.createAnswer();

      await localPeerConnection.setLocalDescription(answer);
      commit("setAnswer", answer);
    }
  }
};
