import { WebSocketService } from "@/services/websocket/websocket.service";
import { Store } from "vuex";

export const userWebSocketPlugin = (ws: WebSocketService<any, any>) => (
  store: Store<any>
) => {
  store.subscribe(mutation => {
    // Only react to the setUser event
    if (mutation.type !== "authStore/setUser") return;
    // Close the connection if the token is not present in the mutation
    if (!mutation.payload.token) return ws.closeConnection();

    // Connect to the WebSocket with the given token
    ws.connect(mutation.payload.token);
  });

  //----------------------------------------------------------------------------
  // EVENT-HANDLERS
  //----------------------------------------------------------------------------

  ws.on("Open", () => store.commit("setConnectedToSocket", true));

  ws.on("Close", () => store.commit("setConnectedToSocket", false));
};
