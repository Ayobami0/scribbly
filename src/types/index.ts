type ActiveItem = "pen" | "eraser";

type PenOption = {
  stroke: number
  color: string
}

type EraserOption = {
  stroke: number
}

type Board = {
  id: string;
  name: string;
  date: Date;
  participants: number;
  isLocal?: boolean;
};

const MType = {
  Unknown: 0,
  Drawing: 1,
  Chat: 2,
  Notification: 3,
} as const;

type MessageType = typeof MType[keyof typeof MType];

type Message = {
  type: MessageType
  data: object
}

type WebSocketConnectionStatus = "connecting" | "open" | "closed" | "error";

export { MType };  export type { ActiveItem, PenOption, EraserOption, WebSocketConnectionStatus, Board, Message, MessageType };
