const WS_SERVER_URL = import.meta.env.VITE_WS_SERVER_URL || "ws://localhost:5000";

function createNewSocket(id: string): WebSocket {
  const url = `${WS_SERVER_URL}/boards/ws/subscribe?id=${id}`

  const ws = new WebSocket(url);

  return ws;
}

export default createNewSocket;
