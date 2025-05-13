import { CreateNewLocal } from "../components/CreateNewLocal";
import { CreateOrJoinRemote } from "../components/CreateOrJoinRemote";
import RecentBoards from "../components/RecentBoards";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col pt-20 px-8 space-y-10 overflow-auto">
      <p className="text-6xl self-center">Scribbly</p>
      <div className="flex space-x-10 self-center">
        <CreateNewLocal />
        <CreateOrJoinRemote />
      </div>
      <RecentBoards />
    </div>
  )
}

