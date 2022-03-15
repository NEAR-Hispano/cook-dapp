import { FC } from "react";

interface Props {
  size?: number;
  isVisible: boolean;
}

const Spinner: FC<Props> = ({ size = 40, isVisible }) => {
    const divs = new Array(4).fill(null);
  return (
    <div
      className="lds-ring"
      style={{ display: isVisible ? "inline-block" : "none" }}
    >
      {divs.map(() => (
          <div style={{ width: size, height: size }} />
      ))}
    </div>
  );
};

export default Spinner;
