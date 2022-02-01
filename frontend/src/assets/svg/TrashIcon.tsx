import { iconElement } from "../../types";

const TrashIcon: iconElement = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-trash3-fill"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M6 1.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v1H6v-1zm5 0v1h3.5a.5.5 0 010 1h-.538l-.853 10.66A2 2 0 0111.115 16h-6.23a2 2 0 01-1.994-1.84L2.038 3.5H1.5a.5.5 0 010-1H5v-1A1.5 1.5 0 016.5 0h3A1.5 1.5 0 0111 1.5zM4.5 5.029a.5.5 0 11.998-.06l.5 8.5a.5.5 0 01-.998.06l-.5-8.5zm6.53-.528a.5.5 0 01.47.528l-.5 8.5a.5.5 0 11-.998-.058l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z"
      ></path>
    </svg>
  );
};

export default TrashIcon;
