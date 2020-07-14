import { Store } from "vuex";
import { WebSocketService } from "@/services/websocket/websocket.service";

let ws: WebSocketService;

export const dataWebSocketPlugin = () => (store: Store<any>) => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case "authStore/setUser" /* Reacting to the setUser mutation */:
        // Closing previous active connections (if available)
        if (ws) ws.closeConnection(); // TODO: issues right after logging in.
        // If the token is missing, stop executing the rest of the code
        if (!mutation.payload.token) return;

        // A new WebSocketService will be created whenever the mutation executes
        ws = new WebSocketService(mutation.payload.token);

        //----------------------------------------------------------------------
        // EVENT HANDLING
        //----------------------------------------------------------------------

        ws.on("open", () =>
          store.commit("userStore/setConnectedToSocket", true)
        );
        ws.on("close", () =>
          store.commit("userStore/setConnectedToSocket", false)
        );

        // Listening to WebSocket events
        ws.listen();
        break;
      case "roomStore/setCurrentRoom":
        //console.log(mutation.payload);
        break;
    }
  });
};
