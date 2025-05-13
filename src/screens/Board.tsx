import { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import DrawToolBar from "../components/DrawToolBar";
import { ActiveItem, EraserOption, PenOption } from "../types";
import { WebSocketProvider } from "../context/WebSocketContext";
import BoardContent from "../components/BoardContent";
import { useLocation, useParams } from "react-router-dom";
import type { Board as BoardType } from "../types";

export default function Board() {
  const { id } = useParams();
  const { state } = useLocation();
  const board = state as BoardType | undefined;

  const [activeItem, setActiveItem] = useState<ActiveItem>("pen")
  const [penOptions, setPenOptions] = useState<PenOption>({ stroke: 5, color: "black" })
  const [eraserOptions, setEraserOptions] = useState<EraserOption>({ stroke: 5 })

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isRemote = board ? !board?.isLocal : !!id; // Checks if the board is coming from memory

  if (isRemote) {
    return <>
      <WebSocketProvider id={id!}>
        <BoardContent isLocal={false}>
          <Canvas ref={canvasRef} activeItem={activeItem} eraserOptions={eraserOptions} penOptions={penOptions} />
          <DrawToolBar
            canvasRef={canvasRef}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            setPenOptions={setPenOptions}
            penOptions={penOptions}
            eraserOptions={eraserOptions}
            setEraserOptions={setEraserOptions}
          />
        </BoardContent>
      </WebSocketProvider>
    </>
  }

  return <>
    <BoardContent>
      <Canvas ref={canvasRef} activeItem={activeItem} eraserOptions={eraserOptions} penOptions={penOptions} />
      <DrawToolBar
        canvasRef={canvasRef}
        eraserOptions={eraserOptions}
        setEraserOptions={setEraserOptions}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setPenOptions={setPenOptions}
        penOptions={penOptions}
      />
    </BoardContent>
  </>
}
