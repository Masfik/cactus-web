import ReconnectingWebSocket from "reconnecting-websocket";
import { PlainWebSocketService } from "@/services/websocket/plain-websocket.service";

export class ReconnectingWebsocketService extends PlainWebSocketService {
  connect(token: string): void {
    this.instance = new ReconnectingWebSocket(
      `${this.endpoint}/${token}`
    ) as WebSocket;
    // Start listening to events
    this.listen();
  }
}
