import { useEffect, useState } from "react";
import { PrivateScreens, PublicScreens } from "../assets/data/screens";
import useAuth from "./useAuth";

const useScreens = () => {
  const isLoggedIn = useAuth();
  const [screens, setScreens] = useState([])

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
