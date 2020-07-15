import { Room } from "@/models/room";

export type Event =
  | "open"
  | "close"
  | "RoomJoin"
  | "IceCandidate"
  | "Offer"
  | "Answer";

type Payload = { event: Event; data: object | string } | null;

export class WebSocketService {
  protected instance: WebSocket;
  protected handlers: { [event: string]: (data: any) => void } = {};

  constructor(
    token: string,
    endpoint: string = (process.env.NODE_ENV === "development"
      ? "ws://"
      : "wss://") + process.env.VUE_APP_API_URL
  ) {
    this.instance = new WebSocket(`${endpoint}/${token}`);
  }

  listen() {
    this.instance.addEventListener("open", () => this.emit("open", null));
    this.instance.addEventListener("close", () => this.emit("close", null));
    this.instance.addEventListener("message", ev => {
      const payload = JSON.parse(ev.data);
      if (payload.event) this.emit(payload.event, payload);
    });
  }

  closeConnection() {
    this.instance.close();
  }

  protected emit(event: Event, payload: Payload) {
    this.handlers[event](payload);
  }

  on(event: Event, cb: (payload: Payload) => void) {
    this.handlers[event] = cb;
  }

  joinRoom(room: Room) {
    this.send("RoomJoin", room.id);
  }

  sendOffer(offer: RTCSessionDescriptionInit) {
    if (offer.sdp) this.send("Offer", offer.sdp);
  }

  sendAnswer(answer: RTCSessionDescriptionInit) {
    this.send("Answer", answer);
  }

  sendIceCandidate(iceCandidate: RTCIceCandidate) {
    this.send("IceCandidate", iceCandidate);
  }

  private send(event: Event, data: object | string) {
    this.instance.send(JSON.stringify({ event, data }));
  }
}
