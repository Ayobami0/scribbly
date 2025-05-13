import { Tooltip } from "react-tooltip";
import { Eraser as EraserIcon } from "lucide-react";

const Eraser = (props) => (
  <>
    <a
      data-tooltip-id="eraser"
      className={`toolbar-item ${props.activeItem == 'eraser' ? 'toolbar-item-active' : ''}`}
      onClick={() => { props.setActiveItem("eraser") }}>
      <EraserIcon />
    </a>
    <Tooltip id="eraser" className="item-tooltip">
    </Tooltip>
  </>
);

export default Eraser;
