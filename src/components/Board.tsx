import { useRef, useState } from "react";
import Canvas from "./Canvas";
import DrawToolBar from "./DrawToolBar";
import { ActiveItem, EraserOption, PenOption } from "../types";

export default function Board() {
  const [activeItem, setActiveItem] = useState<ActiveItem>("pen")
  const [penOptions, setPenOptions] = useState<PenOption>({ stroke: 1, color: "black" })
  const [eraserOptions, setEraserOptions] = useState<EraserOption>({ stroke: 1 })

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <>
    <div className="relative">
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
    </div>
  </>
}
