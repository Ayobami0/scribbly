import Pen from "./PenTool";
import Eraser from "./EraserTool";
import { useEffect, useRef, useState } from "react";

function DrawToolBar(
  props: {
    canvasRef: React.RefObject<HTMLCanvasElement>,
    activeItem: any;
    setActiveItem: any;
    eraserOptions: any;
    penOptions: any;
    setErazerOptions: any;
    setPenOptions: any;
  }) {

  const { activeItem, setActiveItem, eraserOptions, penOptions, setErazerOptions, setPenOptions, canvasRef } = props;
  const [grabbing, setGrabbing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const hasInitializedPosition = useRef(false);

  useEffect(() => {
    if (!hasInitializedPosition.current && toolbarRef.current) {
      const rect = toolbarRef.current.getBoundingClientRect();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      const centeredX = (canvasRect?.width || 0) / 2 - rect.width / 2;
      const centeredY = (canvasRect?.height || 0) - rect.height - 10;
      setPosition({ x: centeredX, y: centeredY });
      hasInitializedPosition.current = true;
    }
  }, []);

  const onPointerDown = function(e: React.PointerEvent) {
    setGrabbing(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  const onPointerMove = function(e: React.PointerEvent) {
    if (!grabbing) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    const toolbarRect = toolbarRef.current?.getBoundingClientRect();


    const toolbarWidth = toolbarRect?.width || 0;
    const toolbarHeight = toolbarRect?.height || 0;

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    const minX = canvasRect?.left || 0;
    const maxX = (canvasRect?.right || 0) - toolbarWidth;
    const minY = canvasRect?.top || 0;
    const maxY = (canvasRect?.bottom || 0) - toolbarHeight;

    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  }
  const onPointerUp = function(e: React.PointerEvent) {
    setGrabbing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`
  };

  return (
    <div ref={toolbarRef} className={`toolbar`} style={style}>
      <DragIndicator
        className={`${grabbing ? "cursor-grabbing" : "cursor-grab"}`} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove} />
      <div className="h-full w-1"></div>
      <Pen setActiveItem={setActiveItem} activeItem={activeItem} penOptions={penOptions} setPenOptions={setPenOptions} />
      <Eraser setActiveItem={setActiveItem} activeItem={activeItem} />
    </div>
  );
}

const DragIndicator = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 1.2 1.2"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g data-name="Layer 2">
      <path fill="none" d="M0 0h1.2v1.2H0z" data-name="invisible box" />
      <path d="M.55.3a.1.1 0 0 1-.1.1.1.1 0 0 1-.1-.1.1.1 0 0 1 .2 0m0 .3a.1.1 0 0 1-.1.1.1.1 0 0 1-.1-.1.1.1 0 0 1 .2 0m0 .3a.1.1 0 0 1-.1.1.1.1 0 0 1-.1-.1.1.1 0 0 1 .2 0m.3-.6a.1.1 0 0 1-.1.1.1.1 0 0 1-.1-.1.1.1 0 0 1 .2 0m0 .3a.1.1 0 0 1-.1.1.1.1 0 0 1-.1-.1.1.1 0 0 1 .2 0m0 .3a.1.1 0 0 1-.1.1.1.1 0 0 1-.1-.1.1.1 0 0 1 .2 0" />
    </g>
  </svg>
);


export default DrawToolBar;
