import React from "react";
import { iconElement } from "../../types";

const NearIcon: iconElement = ({ size = 30 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 288" height={size} width={size}>
      <path
        d="M187.58 79.81l-30.1 44.69a3.2 3.2 0 004.75 4.2l29.63-25.7a1.2 1.2 0 012 .91v80.46a1.2 1.2 0 01-2.12.77L102.18 77.93a15.35 15.35 0 00-11.71-5.43h-3.13A15.34 15.34 0 0072 87.84v113.32a15.34 15.34 0 0015.34 15.34 15.35 15.35 0 0013.08-7.31l30.1-44.69a3.2 3.2 0 00-4.75-4.2L96.14 186a1.2 1.2 0 01-2-.91v-80.48a1.2 1.2 0 012.12-.77l89.55 107.23a15.35 15.35 0 0011.71 5.43h3.13A15.34 15.34 0 00216 201.16V87.84a15.34 15.34 0 00-15.34-15.34 15.35 15.35 0 00-13.08 7.31z"
        data-name="Layer 1"
      ></path>
    </svg>
  );
};

export default NearIcon;
