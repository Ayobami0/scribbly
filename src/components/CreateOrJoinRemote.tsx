import {
  Clipboard as ClipboardIcon,
  LogIn,
  Plus,
  Wifi,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Modal } from "./Modal";
import { HomeButton } from "./HomeButton";
import { createBoard } from "../utils";

export function CreateOrJoinRemote() {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [boardId, setBoardId] = useState("");
  const [newBoardName, setNewBoardName] = useState("");

  function showModal() {
    ref.current?.show();
    setBoardId("");
    setNewBoardName("");
  }

  function handleJoin() {
    if (boardId.trim()) {
      ref.current?.close();
    }
  }

  function handleCreate() {
    if (newBoardName.trim()) {
      createBoard(newBoardName, false).then((e) => {
        alert(`Board ${e.name} created!`);
        ref.current?.close();
      }).catch((e) => {
        alert(e);
      });
    }
  }

  return (
    <>
      <Modal ref={ref}>
        <div className="rounded-xl flex flex-col gap-2">
          <h3 className="text-lg font-semibold flex items-center gap-2 justify-between">
            <Wifi className="w-5 h-5" />
            <X onClick={() => ref.current?.close()} />
          </h3>

          <div className="flex items-center gap-1">
            <input
              className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter Room ID"
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
            />
            <ClipboardIcon
              onClick={() => {
                navigator.clipboard.readText().then((e) => setBoardId(e));
              }}
            />
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-1 disabled:bg-black/50"
            onClick={handleJoin}
            disabled={boardId == "" ? true : false}
          >
            <LogIn className="w-4 h-4" />
            Join
          </button>
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
            OR
          </h3>
          <input
            className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter Room name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-1 disabled:bg-black/50"
            onClick={handleCreate}
            disabled={newBoardName == "" ? true : false}
          >
            <Plus className="w-4 h-4" />
            Create
          </button>
        </div>
      </Modal>
      <HomeButton tooltip="Create or join a remote board" onClick={showModal}>
        <Wifi />
      </HomeButton>
    </>
  );
}
