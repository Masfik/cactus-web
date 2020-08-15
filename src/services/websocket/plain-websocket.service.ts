import {
  WebSocketService,
  Event
} from "@/services/websocket/websocket.service";

/**
 * Event-based WebSocket service that supports clients extending the WebSocket
 * interface.
 */
export class PlainWebSocketService extends WebSocketService<WebSocket, Event> {
  connect(token: string): void {
    this.instance = new WebSocket(`${this.endpoint}/${token}`);
    // Start listening to events
    this.listen();
  }

  listen(): void {
    this.instance!.addEventListener("open", () => this.emit("Open", null));
    this.instance!.addEventListener("close", () => this.emit("Close", null));
    this.instance!.addEventListener("message", ({ data }) => {
      const payload = JSON.parse(data);
      if (payload.event) this.emit(payload.event, payload);
    });
  }

  send(event: Event, data: object | string): void {
    this.instance!.send(JSON.stringify({ event, data }));
  }

  closeConnection(): void {
    this.instance?.close();
    this.instance = undefined;
  }
}
