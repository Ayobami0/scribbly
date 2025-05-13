import { Tooltip } from "react-tooltip";
import { Eraser as EraserIcon } from "lucide-react";
import SizesSelector from "./SizesSelector";
import { ActiveItem, EraserOption } from "../types";

const Eraser = ({ setEraserOptions, eraserOptions, activeItem, setActiveItem }: { setEraserOptions: (opt: EraserOption) => void, setActiveItem: (item: ActiveItem) => void, activeItem: ActiveItem, eraserOptions: EraserOption }) => (
  <>
    <a
      data-tooltip-id="eraser"
      className={`toolbar-item ${activeItem == 'eraser' ? 'toolbar-item-active' : ''}`}
      onClick={() => { setActiveItem("eraser") }}>
      <EraserIcon />
    </a>
    <Tooltip id="eraser" className="item-tooltip" clickable={true}>
      <SizesSelector active={eraserOptions.stroke} sizes={[5, 10, 15, 20]} color={"black"} onSelect={(size) => setEraserOptions({ stroke: size })} />
    </Tooltip>
  </>
);

export default Eraser;
