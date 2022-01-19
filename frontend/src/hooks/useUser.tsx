import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
