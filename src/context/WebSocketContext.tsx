import { createContext, useEffect, useState } from "react";
import { createNewSocket } from "../lib";
import { WebSocketConnectionStatus } from "../types";

const WebSocketContext = createContext<{
  socket: WebSocket | null,
  status: WebSocketConnectionStatus
}>({ socket: null, status: "connecting" });

function WebSocketProvider({ id, children }: { id: string, children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketConnectionStatus>("connecting");

  useEffect(() => {
    const s = createNewSocket(id);

    setSocket(s);
    setStatus("connecting")

    s.onopen = () => { setStatus("open") };
    s.onclose = () => { setStatus("closed") };
    s.onerror = () => { setStatus("error") }

    return () => { s.close() }
  }, [id]);


  return (
    <WebSocketContext.Provider value={{ socket, status }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export { WebSocketProvider, WebSocketContext }
