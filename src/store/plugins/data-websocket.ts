import { Store } from "vuex";
import { WebSocketService } from "@/services/websocket/websocket.service";

let ws: WebSocketService;

export function dataWebSocketPlugin() {
  return (store: Store<any>) => {
    store.subscribe(mutation => {
      // Only react to the setUser mutation from the authStore
      if (mutation.type !== "authStore/setUser") return;

      // A new WebSocketService will be created whenever the mutation executes
      ws = new WebSocketService(mutation.payload.token);

      //------------------------------------------------------------------------
      // EVENT HANDLING
      //------------------------------------------------------------------------

      ws.on("open", () => store.commit("userStore/setConnectedToSocket", true));
      ws.on("close", () =>
        store.commit("userStore/setConnectedToSocket", false)
      );

      // Listening to WebSocket events after registering them above ↑
      ws.listen();
    });
  };
}
