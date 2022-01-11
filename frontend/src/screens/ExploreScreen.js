import React from "react";
import useTranslator from "../hooks/useTranslator";

const ExploreScreen = () => {
  const translate = useTranslator();
  return <div>{translate("explore")}</div>;
};

export default ExploreScreen;
