import { Board } from "../types";

const HTTP_SERVER_URL = import.meta.env.VITE_HTTP_SERVER_URL || "http://localhost:5000";

async function createNewBoard(name: string): Promise<Board> {
  const body = JSON.stringify({ name: name });

  const res = await fetch(
    `${HTTP_SERVER_URL}/boards`,
    { method: "POST", body: body, headers: { "content-type": "application/json" } });

  if (!res.ok) return Promise.reject("could not create board");

  const id = await res.text();

  const now = new Date().toISOString()
  const board: Board = { id: id, name: name, date: now, participants: 1 };

  return Promise.resolve(board);
}

export { createNewBoard };
