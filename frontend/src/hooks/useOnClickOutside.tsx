import { RefObject } from "react";
import useEventListener from "./useEventListener";

type Handler = (event: MouseEvent) => void;

const useOnClickOutside: <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup"
) => void = (ref, handler, mouseEvent) => {
  useEventListener(mouseEvent, (event: MouseEvent) => {
    const el = ref?.current;
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
};

export default useOnClickOutside;
