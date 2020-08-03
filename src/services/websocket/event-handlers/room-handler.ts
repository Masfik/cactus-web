import { WebSocketEventHandler } from "@/services/websocket/event-handlers/ws-event-handler";
import { Room } from "@/models/room";

type RoomEvent = "RoomJoin" | "IceCandidate" | "Offer" | "Answer";

export class RoomHandler extends WebSocketEventHandler<RoomEvent> {
  joinRoom(room: Room) {
    this.ws.send("RoomJoin", room.id);
  }

  sendOffer(offer: RTCSessionDescriptionInit) {
    if (offer.sdp) this.ws.send("Offer", offer.sdp);
  }

  sendAnswer(answer: RTCSessionDescriptionInit) {
    this.ws.send("Answer", answer);
  }

  sendIceCandidate(iceCandidate: RTCIceCandidate) {
    this.ws.send("IceCandidate", iceCandidate);
  }
}
