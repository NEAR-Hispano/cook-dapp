import React from "react";
import { iconElement } from "../../types";

const LangIcon: iconElement = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"      
    >
      <path
        fill="#000"
        d="M15.891 17.016h3.234l-1.641-4.359zm2.625-7.032l4.5 12H21l-1.125-3h-4.734l-1.125 3H12l4.5-12zm-5.625 5.063l-.797 2.063L9 14.016l-5.016 4.969-1.406-1.406 5.109-5.016q-1.875-2.063-3-4.547h2.016Q7.687 9.891 9 11.344 11.156 8.953 12.188 6H.985V3.984h7.031V2.015h1.969v1.969h7.031V6h-2.953q-.469 1.5-1.547 3.398t-2.156 3.117l-.047.047z"
      ></path>
    </svg>
  );
};

export default LangIcon;
