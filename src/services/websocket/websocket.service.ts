export type Event = "open" | "close";

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
  }

  protected emit(event: Event, data: any) {
    this.handlers[event](data);
  }

  on(event: Event, cb: (data: any) => void) {
    this.handlers[event] = cb;
  }
}
