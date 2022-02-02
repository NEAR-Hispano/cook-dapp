import { iconElement } from "../../types";

const SaveIcon: iconElement = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-check2-circle"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 8a5.5 5.5 0 018.25-4.764.5.5 0 00.5-.866A6.5 6.5 0 1014.5 8a.5.5 0 00-1 0 5.5 5.5 0 11-11 0z"></path>
      <path d="M15.354 3.354a.5.5 0 00-.708-.708L8 9.293 5.354 6.646a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l7-7z"></path>
    </svg>
  );
};

export default SaveIcon;
