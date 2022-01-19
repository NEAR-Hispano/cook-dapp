import React from "react";
import { iconElement } from "../../types";

const SearchIcon: iconElement = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"      
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
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
