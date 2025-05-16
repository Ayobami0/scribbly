import { Board } from "../types";

const HTTP_SERVER_URL = import.meta.env.VITE_HTTP_SERVER_URL || "http://localhost:5000";

async function createNewBoard(name: string): Promise<Board> {
  const body = JSON.stringify({ name })

  const res = await fetch(
    `${HTTP_SERVER_URL}/boards`,
    { method: "POST", body: body, headers: { "content-type": "application/json" } });

  console.log(res.status)
  if (res.status !== 200) {
    const err = await res.text()
    return Promise.reject(err)
  };

  const id = await res.text();

  const now = new Date()
  const board: Board = { id: id, name: name, date: now, participants: 1 };

  return Promise.resolve(board);
}

async function getRemoteBoardInfo(id: string): Promise<Board> {

  const res = await fetch(
    `${HTTP_SERVER_URL}/boards/${id}`,
    { method: "GET", headers: { "content-type": "application/json" } });

  if (res.status !== 200) {
    const err = await res.text()
    return Promise.reject(err)
  };

  const board: Board = await res.json()

  return Promise.resolve(board);
}

export { createNewBoard, getRemoteBoardInfo };
