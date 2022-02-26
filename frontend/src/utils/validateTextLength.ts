interface Props {
  textType: "title" | "description";
  text: string;
}

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 1000;
const MIN_DESCRIPTION_LENGTH = 150;
const MIN_TITLE_LENGTH = 10;

// returns null is there is no error with text length or returns string with error description.

const validateTextLength = ({ textType, text }: Props) => {
  const length = text.length;

  if (textType === "title") {
    if (length < MIN_TITLE_LENGTH) {
      return "length is to short."
    } else if (length > MAX_TITLE_LENGTH) {
      return "length is to long."
    }
  }

  if (textType === "description") {
    if (length < MIN_DESCRIPTION_LENGTH) {
      return "length is to short."
    } else if (length > MAX_DESCRIPTION_LENGTH) {
      return "length is to long."
    }
  }  

  return null
};

export default validateTextLength;
