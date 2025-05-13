import { Tooltip } from "react-tooltip";

const HomeButton = ({
  tooltip,
  onClick,
  children,
}: {
  tooltip?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <div className="home-btn cursor-pointer" onClick={onClick}>
    <a data-tooltip-id={tooltip} data-tooltip-content={tooltip}>
      {children}
    </a>
    <Tooltip id={tooltip} />
  </div>
);


export { HomeButton };
