import { toast } from "react-toastify";

interface Props {
  textType: "title" | "description";
  text: string;
  label: string;
}

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 1000;
const MIN_DESCRIPTION_LENGTH = 150;
const MIN_TITLE_LENGTH = 10;

const validateTextLength = ({ textType, text, label }: Props) => {
  const length = text.length;

  if (textType === "title") {
    if (length < MIN_TITLE_LENGTH) {
      toast(`${label} length is to short.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (length > MAX_TITLE_LENGTH) {
      toast(`${label} length is to long.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  if (textType === "description") {
    if (length < MIN_DESCRIPTION_LENGTH) {
      toast(`${label} length is to short.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (length > MAX_DESCRIPTION_LENGTH) {
      toast(`${label} length is to long.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
};

export default validateTextLength;
