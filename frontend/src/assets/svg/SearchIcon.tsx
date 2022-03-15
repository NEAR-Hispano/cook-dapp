import { FC } from "react";

interface Props {
  size?: number;
  stroke?: string;
}

const SearchIcon: FC<Props> = ({ size = 14, stroke = "#FFF" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"      
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"        
        transform="translate(1 1)"
      >
        <circle  cx="5.333" cy="5.333" r="5.333"></circle>
        <path d="M9.103 9.103L12 12"></path>
      </g>
    </svg>
  );
}

export default SearchIcon;
