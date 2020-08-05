import { ConnectionHandler } from "@/services/websocket/event-handlers/connection-handler";
import { EventHandler } from "@/utils/event-handler";
import { WebSocketEventHandler } from "@/services/websocket/event-handlers/ws-event-handler";

export type Event = "Open" | "Close";
export type Payload = { event: Event; data: object | string } | null;

/**
 * WebSocket service that supports clients extending the WebSocket interface.
 * Type T1 refers to the WebSocket client being used.
 * Type T2 refers to the list of events accepted by the event handlers.
 */
export abstract class WebSocketService<
  T1 extends WebSocket, //  <- WebSocket client
  T2 extends string // ← Events ("open" | "close")
> {
  protected instance?: T1;
  protected handlers: EventHandler<any, any>[] = [];

  constructor(
    protected endpoint: string = (process.env.NODE_ENV === "development"
      ? "ws://"
      : "wss://") + process.env.VUE_APP_API_URL
  ) {
    // Register a handler for connection events ("Open" and "Close")
    this.createHandler(ConnectionHandler);
  }

  /**
   * Connect to the WebSocket with the specified token.
   * The client should immediately start listening to all events.
   *
   * @param token
   */
  abstract connect(token: string): void;

  /**
   * Listen to the very basic "open", "close" and "message" events.
   *
   * @protected
   */
  protected listen() {
    this.instance!.addEventListener("open", () => this.emit("Open", null));
    this.instance!.addEventListener("close", () => this.emit("Close", null));
    this.instance!.addEventListener("message", ({ data }) => {
      const payload = JSON.parse(data);
      if (payload.event) this.emit(payload.event, payload);
    });
  }

  /**
   * Emit events to all handlers.
   * Some handlers will ignore the event because it's non-existent in their
   * {@link EventHandler#events events } map.
   *
   * @param event
   * @param payload
   * @protected
   */
  protected emit(event: Event, payload: Payload) {
    this.handlers.forEach(handler => handler.emit(event, payload));
  }

  /**
   * Send any form of message to the socket.
   * When sending an object, it will be automatically serialized.
   *
   * @param event - the event to be triggered
   * @param data - the message to send (object or string)
   */
  send(event: T2, data: object | string) {
    this.instance!.send(JSON.stringify({ event, data }));
  }

  /**
   * Close the WebSocket connection.
   * Nothing will happen if the connection is already closed or never
   * instantiated.
   */
  closeConnection() {
    this.instance?.close();
    this.instance = undefined;
  }

  /**
   * Listen to the specified event and execute the given callback whenever
   * the event is triggered.
   * Valid events are "Open" and "Close".
   *
   * @param event
   * @param callback
   */
  on(event: Event, callback: (payload: Payload) => void) {
    // The first handler is the ConnectionHandler (open and close events)
    this.handlers[0].on(event, callback);
  }

  /**
   * Create an event handler that can make use of the WebSocketService.
   * Usage: `ws.createHandler(<EVENT_HANDLER_CLASS_NAME>)`
   *
   * There is no need to instantiate the EventHandler and pass it to this
   * method. It will automatically do so itself behind the scenes.
   *
   * @param handler
   */
  createHandler<T extends WebSocketEventHandler<any>>(handler: {
    new (ws: WebSocketService<any, any>): T;
  }): T {
    const h = new handler(this);
    this.handlers.push(h);
    return h;
  }
}
