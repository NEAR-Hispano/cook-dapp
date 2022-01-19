import { useEffect, useState } from "react";
import { PrivateScreens, PublicScreens } from "../assets/data/screens";
import { screenInterface } from "../types";
import useAuth from "./useAuth";

const useScreens = () => {
  const isLoggedIn = useAuth();
  const [screens, setScreens] = useState<Array<screenInterface>>([])

  useEffect(() => {
    if(isLoggedIn) {
        setScreens(PrivateScreens)
    } else {
        setScreens(PublicScreens)
    }
  },[isLoggedIn])

  return screens;
};

export default useScreens;
