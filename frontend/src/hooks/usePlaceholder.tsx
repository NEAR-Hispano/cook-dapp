import { useState } from "react";
import useTimeout from "./useTimeout";

const usePlaceholder = (timelapse = 3500) => {
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  useTimeout(() => setIsPlaceholder(false), timelapse);

  return [isPlaceholder];
};

export default usePlaceholder;
