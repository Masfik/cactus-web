import { Store } from "vuex";
import { WebSocketService } from "@/services/websocket/websocket.service";
import { RoomHandler } from "@/services/websocket/event-handlers/room-handler";

export const roomWebSocketPlugin = (ws: WebSocketService<any, any>) => (
  store: Store<any>
) => {
  // Registering the room event handler
  const roomHandler = ws.createHandler(RoomHandler);

  store.subscribe(mutation => {
    switch (mutation.type) {
      case "roomStore/setCurrentRoom":
        roomHandler.joinRoom(mutation.payload);
        break;
      case "streamStore/setIceCandidate":
        if (store.state.streamStore.isStreamer)
          roomHandler.sendIceCandidate(mutation.payload);
        break;
      case "streamStore/setOffer":
        if (store.state.streamStore.isStreamer)
          roomHandler.sendOffer(mutation.payload);
        break;
      case "streamStore/setAnswer":
        if (!store.state.streamStore.isStreamer)
          roomHandler.sendAnswer(mutation.payload);
        break;
    }
  });

  //----------------------------------------------------------------------------
  // EVENT-HANDLERS
  //----------------------------------------------------------------------------

  // → RTCOffer
  roomHandler.on("Offer", async payload => {
    const sdp = payload?.data as string;
    if (!sdp) return;

    // Setting the offer as the remote description
    await store.state.streamStore.localPeerConnection?.setRemoteDescription({
      type: "offer",
      sdp
    });

    // Giving an answer to the offer
    await store.dispatch("streamStore/createAnswer");
  });

  // → RTCAnswer
  roomHandler.on("Answer", async payload => {
    const answer = payload?.data as RTCSessionDescriptionInit;
    if (!answer) return;

    await store.state.streamStore.localPeerConnection?.setRemoteDescription(
      answer
    );
  });

  // → RTCIceCandidate
  roomHandler.on("IceCandidate", async payload => {
    const candidate = payload?.data as RTCIceCandidate;
    if (!candidate) return;

    await store.state.streamStore.localPeerConnection
      .addIceCandidate(candidate)
      .catch(console.error);
  });
};
