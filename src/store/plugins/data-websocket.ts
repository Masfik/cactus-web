import { Store } from "vuex";
import { WebSocketService } from "@/services/websocket/websocket.service";

let ws: WebSocketService;

export const dataWebSocketPlugin = () => (store: Store<any>) => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case "authStore/setUser" /* Reacting to the setUser mutation */:
        // Closing previous active connections (if available)
        if (ws) ws.closeConnection(); // TODO: issues right after logging in.
        // If the token is missing, stop executing the rest of the code
        if (!mutation.payload.token) return;

        // A new WebSocketService will be created whenever the mutation executes
        ws = new WebSocketService(mutation.payload.token);

        //----------------------------------------------------------------------
        // EVENT HANDLING
        //----------------------------------------------------------------------

        ws.on("open", () =>
          store.commit("userStore/setConnectedToSocket", true)
        );
        ws.on("close", () =>
          store.commit("userStore/setConnectedToSocket", false)
        );

        //|----------|//
        //| RTCOffer |//
        //|----------|//
        ws.on("Offer", async payload => {
          const sdp = payload?.data as string;

          if (!sdp) return;

          // Setting the offer as the remote description
          await store.state.streamStore.localPeerConnection?.setRemoteDescription(
            {
              type: "offer",
              sdp
            }
          );

          // Giving an answer to the offer
          await store.dispatch("streamStore/createAnswer");
        });

        //|-----------|//
        //| RTCAnswer |//
        //|-----------|//
        ws.on("Answer", async payload => {
          const answer = payload?.data as RTCSessionDescriptionInit;
          if (!answer) return;

          await store.state.streamStore.localPeerConnection?.setRemoteDescription(
            answer
          );
        });

        //|-----------------|//
        //| RTCIceCandidate |//
        //|-----------------|//
        ws.on("IceCandidate", async payload => {
          const candidate = payload?.data as RTCIceCandidate;
          if (!candidate) return;

          await store.state.streamStore.localPeerConnection
            .addIceCandidate(candidate)
            .catch(console.error);
        });

        // Listening to WebSocket events
        ws.listen();
        break;
      case "roomStore/setCurrentRoom":
        ws.joinRoom(mutation.payload);
        break;
      case "streamStore/setIceCandidate":
        if (store.state.streamStore.isStreamer)
          ws.sendIceCandidate(mutation.payload);
        break;
      case "streamStore/setOffer":
        if (store.state.streamStore.isStreamer) ws.sendOffer(mutation.payload);
        break;
      case "streamStore/setAnswer":
        if (!store.state.streamStore.isStreamer)
          ws.sendAnswer(mutation.payload);
        break;
    }
  });
};
