import { Clock, Users, History, Ban, Trash, Wifi, Monitor } from "lucide-react";
import { Board } from "../types";
import { useEffect, useState } from "react";
import { loadBoards } from "../utils";
import { removeFromLocal } from "../lib";
import { useNavigate } from "react-router-dom";



export default function RecentBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    const load = () => {
      try {
        const b = loadBoards()
        setBoards(b);
      } catch {
        setBoards([]);
      }
    };

    load();
  }, []);

  const remove = (id: string) => {
    const yes = confirm("Are you sure you want to delete this board?")
    if (!yes) return;
    try {
      removeFromLocal(id);
      setBoards(loadBoards())
    } catch (error) {
      alert("could not remove board")
    }
  }
  return (
    <div className="w-full flex flex-col mb-5">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5" /> Past Board Rooms
      </h2>
      <div className={boards.length == 0 ? 'flex items-center justify-center h-full' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-center'}>
        {boards.length == 0 ?
          <div className="flex items-center justify-center h-full">
            <h3 className="text-xl mb-4 flex flex-col items-center gap-2">
              <Ban className="w-20 h-20 md:w-24 md:h-24" />
              No Boards
            </h3>
          </div>
          : boards.map(b => (
            <div
              key={b.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
              onClick={() => {
                navigator(`/boards/${b.id}`, { state: b });
              }}
            >
              <div className="flex items-center">
                <h3 className="text-lg font-bold flex-1">{b.name}</h3>
                {b.isLocal ? <Monitor width={16} height={16} /> : <Wifi width={16} height={16} />}
                <Trash width={16} height={16} className="ml-2 text-red-400 hover:text-red-600" onClick={() => { remove(b.id) }} />
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-4 h-4" />
                {b.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <Users className="w-4 h-4" />
                {b.participants}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
