import { createNewBoard, createNewBoardLocal, loadBoardsLocal, saveToLocal } from "../lib";
import { getRemoteBoardInfo } from "../lib/api";
import { Board } from "../types";

async function createBoard(name: string, isLocal: boolean = true): Promise<Board> {
  if (isLocal) {
    return await createNewBoardLocal(name)
  } else {
    const board = await createNewBoard(name);
    saveToLocal(board);

    return board;
  }
}

function loadBoards(): Board[] {
  return loadBoardsLocal()
}

async function saveRemoteBoardInfo(id: string) {
  const board = await getRemoteBoardInfo(id);
  saveToLocal(board);
}

export { createBoard, loadBoards, saveRemoteBoardInfo }
