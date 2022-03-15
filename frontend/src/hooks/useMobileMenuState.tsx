import { useContext } from "react";
import { MobileContext } from "../context/MobileMenuProvider";

const useMobileMenuState = () => {
  return useContext(MobileContext);
};

export default useMobileMenuState;
