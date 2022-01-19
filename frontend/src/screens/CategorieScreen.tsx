import { FC } from "react";
import { useLocation } from "react-router-dom";

const Categorie: FC = () => {
  const { pathname } = useLocation();
  return <div>{pathname && pathname.split("/")[2]}</div>;
};

export default Categorie;
