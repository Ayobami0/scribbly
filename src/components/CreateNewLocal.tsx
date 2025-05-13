import {
  Monitor,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { HomeButton } from "./HomeButton";
import { Modal } from "./Modal";
import { createBoard } from "../utils";

export function CreateNewLocal() {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [name, setName] = useState("");

  function showModal() {
    ref.current?.show();
    setName("");
  }

  function onCreate() {
    createBoard(name, true).then((e) => {
      alert(`Board ${e.name} created!`);
      ref.current?.close();
    }).catch((e) => {
      alert(e);
    });
  }

  return (
    <>
      <HomeButton tooltip="Create a local board" onClick={showModal}>
        <Monitor />
      </HomeButton>
      <Modal ref={ref}>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold flex items-center justify-between">
            <Monitor />
            <X onClick={() => ref.current?.close()} />
          </h3>
          <input
            placeholder="Enter room name"
            className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onCreate();
              }
            }}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:bg-black/50"
            disabled={name == "" ? true : false}
            onClick={onCreate}
          >
            Create
          </button>
        </div>
      </Modal>
    </>
  );
}
