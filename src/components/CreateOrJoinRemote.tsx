import {
  Clipboard as ClipboardIcon,
  Wifi,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Modal } from "./Modal";
import { HomeButton } from "./HomeButton";
import { createBoard, saveRemoteBoardInfo } from "../utils";
import { useNavigate } from "react-router-dom";
import Spinnner from "./Spinner";

export function CreateOrJoinRemote() {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [boardId, setBoardId] = useState("");
  const [newLoading, setNewLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const navigate = useNavigate();

  function showModal() {
    ref.current?.show();
    setBoardId("");
    setNewBoardName("");
  }

  function handleJoin() {
    setJoinLoading(true);
    const id = boardId.trim();

    if (id) {
      saveRemoteBoardInfo(id).then((_) => {
        ref.current?.close();
        navigate(`boards/${id}`)
      }).catch((e) => {
        alert(e);
      }).finally(() => {
        setJoinLoading(false);
      });
    }
  }

  function handleCreate() {
    setNewLoading(true);
    if (newBoardName.trim()) {
      createBoard(newBoardName, false).then((e) => {
        alert(`Board ${e.name} created!`);
        ref.current?.close();
      }).catch((e) => {
        alert(e);
      }).finally(() => {
        setNewLoading(false);
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
            {joinLoading ? <Spinnner height={20} width={20} /> : <></>}
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
            {newLoading ? <Spinnner height={20} width={20} /> : <></>}
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
