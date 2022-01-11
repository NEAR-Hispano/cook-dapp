import { useTranslation } from "react-i18next";

const useTranslator = () => {
  const { t } = useTranslation();
  return t;
};

export default useTranslator;
