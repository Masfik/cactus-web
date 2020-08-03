import {
  WebSocketService,
  Event
} from "@/services/websocket/websocket.service";

export class PlainWebSocketService extends WebSocketService<WebSocket, Event> {
  connect(token: string): void {
    this.instance = new WebSocket(`${this.endpoint}/${token}`);
    // Start listening to events
    this.listen();
  }
}
