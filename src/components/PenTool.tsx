import { Tooltip } from "react-tooltip";
import type { ActiveItem, PenOption } from "../types"
import ColorSelector from "./ColorSelector";
import { PencilLine } from "lucide-react";

const colors = ["black", "red", "blue", "green", "yellow"];

function Pen(props: { setActiveItem: (a: ActiveItem) => void; setPenOptions: (a: PenOption) => void; activeItem: string; penOptions: PenOption; }) {
  const { setActiveItem, activeItem, penOptions, setPenOptions }: {
    setActiveItem: (a: ActiveItem) => void,
    setPenOptions: (a: PenOption) => void,
    activeItem: string,
    penOptions: PenOption
  } = props;

  return <>
    <a
      data-tooltip-id="pen"
      className={`toolbar-item ${activeItem == 'pen' ? 'toolbar-item-active' : ''}`}
      onClick={() => { setActiveItem("pen") }}>
      <PencilLine />
    </a>
    <Tooltip
      id="pen"
      className="item-tooltip"
      clickable={true}
    >
      <div className="flex flex-row gap-1 items-center">
        <div
          className="rounded-full"
          style={{
            width: `${penOptions.stroke * 2}px`,
            height: `${penOptions.stroke * 2}px`,
            backgroundColor: penOptions.color,
          }}
        />
        <input
          type="range"
          color={penOptions.color}
          min={1}
          max={20}
          value={penOptions.stroke}
          onChange={(e) =>
            setPenOptions({ ...penOptions, stroke: parseInt(e.target.value) })
          }
        />
        {colors.map((color) => {
          return <ColorSelector
            color={color}
            active={color == penOptions.color}
            onSelect={(color) => { console.log(color); setPenOptions({ ...penOptions, color: color }) }}
            key={color}
          />
        })}
      </div>
    </Tooltip>
  </>
}

export default Pen
