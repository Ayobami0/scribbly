import { useWebSocket } from "../hooks";
import BoardProgressIndicator from "../components/BoardProgressIndicator";
import Center from "../components/Center";
import { createContext, useEffect, useMemo, useState } from "react";
import { Message, MType } from "../types";

type NetworkBoardStateType = {
  canvasMessage: Message | null,
  chatMessages: Message[]
  participants: string[]
}

const NetworkBoardStateContext = createContext<NetworkBoardStateType | null>(null);

function NetworkBoardStateProvider({ children }: { children: React.ReactNode }) {
  let node: React.ReactNode;
  const { message, status } = useWebSocket();

  const [canvasMessage, setCanvasMessage] = useState<Message | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState([]);

  const value = useMemo(() => ({
    canvasMessage,
    chatMessages,
    participants
  }),
    [canvasMessage, chatMessages, participants]);

  useEffect(() => {
    if (message != null) {
      switch (message?.type) {
        case MType.Drawing: setCanvasMessage(message); break;
        case MType.Chat: setChatMessages([...chatMessages, message]); break;
        default:
          console.error("Unknown Message Type", message)
      }
    }
  }, [message]);


  switch (status) {
    case "closed":
      node = <>
        <Center>
          <h1>Closed</h1>
        </Center>
      </>
      break
    case "connecting":
      node = <Center>
        <div className="flex flex-col space-y-3 items-center">
          <h1>Loading</h1>
          <BoardProgressIndicator />
        </div>
      </Center>
      break
    case "open":
      node = children;
      break
    case "error":
      node = <Center>
        "Errored"
      </Center>
  }

  return <NetworkBoardStateContext.Provider value={value}>
    <div className="relative h-screen w-screen">
      {node}
    </div>;
  </NetworkBoardStateContext.Provider>
}

export { NetworkBoardStateContext, NetworkBoardStateProvider}; export type { NetworkBoardStateType};
