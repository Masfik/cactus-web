import {
  WebSocketService,
  Payload
} from "@/services/websocket/websocket.service";
import { EventHandler } from "@/utils/event-handler";

export class WebSocketEventHandler<T extends string> extends EventHandler<
  T,
  (payload: Payload) => void
> {
  constructor(protected ws: WebSocketService<any, any>) {
    super();
  }
}
