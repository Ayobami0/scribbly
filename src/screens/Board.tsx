import { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import DrawToolBar from "../components/DrawToolBar";
import { ActiveItem, EraserOption, PenOption } from "../types";
import { WebSocketProvider } from "../context/WebSocketContext";
import BoardContent from "../components/BoardContent";

export default function Board({ id }: { id: string }) {
  const [activeItem, setActiveItem] = useState<ActiveItem>("pen")
  const [penOptions, setPenOptions] = useState<PenOption>({ stroke: 1, color: "black" })
  const [eraserOptions, setEraserOptions] = useState<EraserOption>({ stroke: 1 })

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <>
    <WebSocketProvider id={id}>
      <BoardContent>
        <Canvas ref={canvasRef} activeItem={activeItem} eraserOptions={eraserOptions} penOptions={penOptions} />
        <DrawToolBar
          canvasRef={canvasRef}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setPenOptions={setPenOptions}
          penOptions={penOptions}
          erazerOptions={eraserOptions}
          setEraserOption={setEraserOptions}
        />
      </BoardContent>
    </WebSocketProvider>
  </>
}
