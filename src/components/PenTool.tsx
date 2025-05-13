import { Tooltip } from "react-tooltip";
import type { PenOption } from "../types"
import ColorSelector from "./ColorSelector";
import { PencilLine } from "lucide-react";

const colors = ["black", "red", "blue", "green", "yellow"];
function Pen(props) {
  const { setActiveItem, activeItem, penOptions, setPenOptions }: {
    setActiveItem: (a: string) => void,
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
