import { createContext, useCallback, useEffect, useState } from "react";
import { createNewSocket } from "../lib";
import { Message, WebSocketConnectionStatus } from "../types";

const WebSocketContext = createContext<{
  socket: WebSocket | null,
  status: WebSocketConnectionStatus
  send: ((m: Message) => void) | null
  message: Message | null
}>({
  socket: null,
  status: "connecting",
  send: null,
  message: null
});

function WebSocketProvider({ id, children }: { id: string, children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketConnectionStatus>("connecting");
  const [message, setMessage] = useState<Message | null>(null);

  const send = useCallback((msg: Message) => {
    if (socket?.readyState == WebSocket.OPEN) {
      socket?.send(JSON.stringify(msg));
    }
  }, [socket])

  useEffect(() => {
    const s = createNewSocket(id);

    setSocket(s);
    setStatus("connecting")

    s.onopen = () => { setStatus("open") };
    s.onclose = () => { setStatus("closed") };
    s.onerror = () => { setStatus("error") }

    s.onmessage = (e) => {
      try {
        const msg: Message = JSON.parse(e.data);

        setMessage(msg);
      } catch (e) {
        console.error(e);
      }
    }

    return () => { s.close() }
  }, [id]);


  return (
    <WebSocketContext.Provider value={{ socket, status, send, message }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export { WebSocketProvider, WebSocketContext }
