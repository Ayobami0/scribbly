import React, { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../hooks";
import { MType } from "../types";

const Canvas = React.forwardRef<HTMLCanvasElement, { activeItem: any; eraserOptions: any; penOptions: any }>((props, ref) => {
  const { activeItem, eraserOptions, penOptions } = props;
  const [isDrawing, setIsDrawing] = useState(false);
  const prevPos = useRef({ x: 0, y: 0 })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const socket = useWebSocket();


  let cusorState: string = "";

  switch (activeItem) {
    case "pen": cusorState = "canvas-cursor-pen"; break;
    case "eraser": cusorState = "canvas-cursor-eraser"; break;
  }

  /// To get the positon of the pointer relative to the canvas
  const getPointerPosition = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();

    return {
      x: e.clientX - (rect?.left || 0),
      y: e.clientY - (rect?.top || 0)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const pos = getPointerPosition(e);
    prevPos.current = pos;
    setIsDrawing(true);
  }

  const onPointerUp = (_: React.PointerEvent) => {
    setIsDrawing(false);
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;

    const stroke = activeItem === "pen" ? penOptions.stroke : eraserOptions.stroke;
    const color = activeItem === "pen" ? penOptions.color : null;

    const curr = getPointerPosition(e);
    const prev = prevPos.current;

    const canvas = ref.current;
    const context = canvas?.getContext('2d');

    if (socket.socket) {
      const msg = { type: MType.Drawing, data: { x: curr.x, y: curr.y, stroke: stroke, type: activeItem, color: color } }
      socket.socket.send(JSON.stringify(msg))
      return;
    }


    switch (activeItem) {
      case "pen":
        context!.globalCompositeOperation = "source-over";
        context!.strokeStyle = penOptions.color;
        context!.lineWidth = penOptions.stroke;
        break;
      case "eraser":
        context!.globalCompositeOperation = "destination-out";
        context!.lineWidth = eraserOptions.stroke;
        break;
    }

    context!.beginPath();
    context!.moveTo(prev.x, prev.y);
    context!.lineTo(curr.x, curr.y);
    context!.lineCap = "round";
    context!.stroke();

    prevPos.current = curr;

  }

  useEffect(() => {
    function onResize() {
      const canvas = ref.current;
      const context = canvas?.getContext("2d");

      const dpr = window.devicePixelRatio || 1;
      let { width, height } = wrapperRef.current?.getBoundingClientRect() || { width: 0, height: 0 };

      width = width - 10;
      height = height - 10;

      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;


      context!.scale(dpr, dpr);
    }
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center" ref={wrapperRef}>
      <canvas
        ref={ref}
        className={`canvas ${cusorState}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerOut={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerMove={onPointerMove}
      ></canvas>
    </div>

  );
})

export default Canvas;
