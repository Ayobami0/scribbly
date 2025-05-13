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
  date: string;
  participants: number;
  isLocal?: boolean;
};

type WebSocketConnectionStatus = "connecting" | "open" | "closed" | "error";

export type { ActiveItem, PenOption, EraserOption, WebSocketConnectionStatus, Board };
