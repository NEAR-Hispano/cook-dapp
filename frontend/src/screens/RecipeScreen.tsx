import React, { FC } from "react";
import { useLocation } from "react-router-dom";

interface Props {}

const RecipeScreen: FC<Props> = ({}) => {
  const { pathname } = useLocation();
  return <div>{pathname.split("/")[2]}</div>;
};

export default RecipeScreen;
