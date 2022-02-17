import { FC } from "react";
import CrossIcon from "../assets/svg/CrossIcon";

interface Props {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const PopUp: FC<Props> = ({ isOpened, setIsOpened, children, title }) => {
  return (
    <div
      className="popup-container"
      style={{ display: isOpened ? "flex" : "none" }}
    >
      <div className="popup-content">
        <div className="popup-content-header">
          <div className="title-popup">{title}</div>
          <div className="close-popup-icon" onClick={() => setIsOpened(prev => !prev)}>
            <CrossIcon />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
