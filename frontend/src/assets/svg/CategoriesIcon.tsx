import { iconElement } from "../../types";

const CategoriesIcon: iconElement = ({ size = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-boxes"
      viewBox="0 0 16 16"
    >
      <path d="M7.752.066a.5.5 0 01.496 0l3.75 2.143a.5.5 0 01.252.434v3.995l3.498 2A.5.5 0 0116 9.07v4.286a.5.5 0 01-.252.434l-3.75 2.143a.5.5 0 01-.496 0l-3.502-2-3.502 2.001a.5.5 0 01-.496 0l-3.75-2.143A.5.5 0 010 13.357V9.071a.5.5 0 01.252-.434L3.75 6.638V2.643a.5.5 0 01.252-.434L7.752.066zM4.25 7.504L1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933zm1 3.134l2.75 1.571v-3.134L8.5 9.933v3.134zm.508-3.996l2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572zM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21zM5.258 2.643L8 4.21l2.742-1.567L8 1.076 5.258 2.643zM15 9.933l-2.75 1.571v3.134L15 13.067V9.933zM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571z"></path>
    </svg>
  );
};

export default CategoriesIcon;
