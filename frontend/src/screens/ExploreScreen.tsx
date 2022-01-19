import { FC } from "react";
import useTranslator from "../hooks/useTranslator";

const ExploreScreen: FC = () => {
  const translate = useTranslator();
  return <div>{translate("explore")}</div>;
};

export default ExploreScreen;
