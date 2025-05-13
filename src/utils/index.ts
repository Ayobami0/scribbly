import { createNewBoard, createNewBoardLocal, loadBoardsLocal } from "../lib";
import { Board } from "../types";

async function createBoard(name: string, isLocal: boolean = true): Promise<Board> {
  return isLocal
    ? await createNewBoardLocal(name)
    : await createNewBoard(name);
}

function loadBoards(): Board[] {
  return loadBoardsLocal()
}

export { createBoard, loadBoards }
