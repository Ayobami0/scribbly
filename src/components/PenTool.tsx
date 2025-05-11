import { Tooltip } from "react-tooltip";
import type { PenOption } from "../types"
import ColorSelector from "./ColorSelector";

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
      <svg
        width={24}
        height={24}
        viewBox="0 0 0.54 0.54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.068 0.388v0.084h0.084l0.249 -0.249 -0.084 -0.084zM0.466 0.158a0.022 0.022 0 0 0 0 -0.032L0.413 0.074a0.022 0.022 0 0 0 -0.032 0l-0.041 0.041 0.084 0.084z"
          fillRule="evenodd"
        />
      </svg>
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
            onSelect={(color) => { console.log(color);setPenOptions({ ...penOptions, color: color }) }}
            key={color}
          />
        })}
      </div>
    </Tooltip>
  </>
}

export default Pen
