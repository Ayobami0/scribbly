import { useWebSocket } from "../hooks";
import BoardProgressIndicator from "./BoardProgressIndicator";
import Center from "./Center";

export default function BoardContent({ isLocal = true, children }: { isLocal?: boolean, children: React.ReactNode }) {
  if (isLocal) {
    return <div className="relative h-screen w-screen">
      {children}
    </div>;
  }

  let node: React.ReactNode;
  const { status } = useWebSocket();

  switch (status) {
    case "closed":
      node = <>
        <Center>
          <h1>Closed</h1>
        </Center>
      </>
      break
    case "connecting":
      node = <Center>
        <div className="flex flex-col space-y-3 items-center">
          <h1>Loading</h1>
          <BoardProgressIndicator />
        </div>
      </Center>
      break
    case "open":
      node = children;
      break
    case "error":
      node = <Center>
        "Errored"
      </Center>
  }
  return <div className="relative h-screen w-screen">
    {node}
  </div>;
}

