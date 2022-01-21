import { FC } from "react";

interface Prop {
  size: number;
  fillCircle?: string;
  fillLetter?: string;
}

const NEARCurrencyIcon: FC<Prop> = ({ size = 16, fillCircle = "#FFF", fillLetter = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" r="16" fill={fillCircle}></circle>
      <g clipPath="url(#clip0000000003)">
        <path
          fill={fillLetter}
          d="M20.842 8.845l-3.344 4.931a.35.35 0 00.06.46.357.357 0 00.468.003l3.292-2.835a.134.134 0 01.201.027.132.132 0 01.021.073v8.878a.131.131 0 01-.088.125.135.135 0 01-.148-.04l-9.95-11.83a1.704 1.704 0 00-1.302-.599h-.348a1.71 1.71 0 00-1.205.496C8.18 8.85 8 9.282 8 9.73v12.504c0 .449.18.88.5 1.197a1.715 1.715 0 002.659-.31L14.5 18.19a.35.35 0 00-.06-.46.356.356 0 00-.468-.004l-3.292 2.836a.133.133 0 01-.144.022.134.134 0 01-.078-.122v-8.88a.131.131 0 01.088-.125.135.135 0 01.148.04l9.95 11.832a1.704 1.704 0 001.3.599h.348a1.713 1.713 0 001.206-.496 1.694 1.694 0 00.5-1.197V9.731c0-.45-.18-.88-.5-1.197a1.71 1.71 0 00-2.658.31z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip00033">
          <path
            fill="#fff"
            d="M0 0H16V16H0z"
            transform="translate(8 7.983)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default NEARCurrencyIcon;
