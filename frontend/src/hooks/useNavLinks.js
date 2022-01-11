import { useEffect, useState } from "react";
import { publicLinks, privateLinks } from "../assets/data/navLinks";
import useAuth from "./useAuth";

const useNavLinks = () => {
  const isLoggedIn = useAuth();
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setNavLinks(privateLinks);
    } else {
      setNavLinks(publicLinks);
    }
  }, [isLoggedIn]);

  return navLinks;
};

export default useNavLinks;
