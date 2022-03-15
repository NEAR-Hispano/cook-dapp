import { iconElement } from "../../types";

const BookmarkPlus: iconElement = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-bookmark-plus"
      viewBox="0 0 16 16"
    >
      <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2zm2-1a1 1 0 00-1 1v12.566l4.723-2.482a.5.5 0 01.554 0L13 14.566V2a1 1 0 00-1-1H4z"></path>
      <path d="M8 4a.5.5 0 01.5.5V6H10a.5.5 0 010 1H8.5v1.5a.5.5 0 01-1 0V7H6a.5.5 0 010-1h1.5V4.5A.5.5 0 018 4z"></path>
    </svg>
  );
};

export default BookmarkPlus;
