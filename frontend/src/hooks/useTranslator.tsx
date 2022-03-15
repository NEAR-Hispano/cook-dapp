import { TFunction, useTranslation } from "react-i18next";

const useTranslator: () => TFunction<"translation", undefined> = () => {
  const { t } = useTranslation();
  return t;
};

export default useTranslator;
