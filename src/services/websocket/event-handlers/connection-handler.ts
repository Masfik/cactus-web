import { WebSocketEventHandler } from "@/services/websocket/event-handlers/ws-event-handler";
import { Event } from "@/services/websocket/websocket.service";

export class ConnectionHandler extends WebSocketEventHandler<Event> {}
