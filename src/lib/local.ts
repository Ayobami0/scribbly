import { Board } from "../types";
import { v4 as uuidV4 } from "uuid"

function saveToLocal(board: Board) {
  let data = localStorage.getItem("boards");

  if (!data) {
    data = "[]";
  }

  const boards: Board[] = JSON.parse(data);

  if (!Array.isArray(boards)) {
    throw new Error("unable to save board");
  }

  boards.push(board);

  localStorage.setItem("boards", JSON.stringify(boards));
}

function removeFromLocal(id: string) {
  let data = localStorage.getItem("boards");

  if (!data) {
    data = "[]";
  }

  const boards: Board[] = JSON.parse(data);

  if (!Array.isArray(boards)) {
    throw new Error("unable to delete board");
  }

  const filtered = boards.filter((e) => (e.id !== id));

  localStorage.setItem("boards", JSON.stringify(filtered));
}

async function createNewBoardLocal(name: string): Promise<Board> {
  let data = localStorage.getItem("boards");

  if (!data) {
    data = "[]";
  }

  const boards: Board[] = JSON.parse(data);

  if (!Array.isArray(boards)) {
    return Promise.reject("unable to create board");
  }

  const now = new Date();
  const id = uuidV4();

  const board: Board = { id: id, name: name, date: now, participants: 1, isLocal: true };

  boards.push(board);

  localStorage.setItem("boards", JSON.stringify(boards));

  return Promise.resolve(board);
}

function loadBoardsLocal() {
  let data = localStorage.getItem("boards");

  if (!data) {
    data = "[]";
  }

  const boards: Board[] = JSON.parse(data);

  if (!Array.isArray(boards)) {
    return [];
  }
  const updated = boards.map((e) => ({ ...e, date: new Date(e.date) }));
  return updated;
}

export { createNewBoardLocal, loadBoardsLocal, saveToLocal, removeFromLocal }
