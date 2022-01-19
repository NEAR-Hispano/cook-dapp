import ReactDOM from "react-dom";
import App from "./App";
import { initContract } from "./utils";
import { BrowserRouter as Router } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    keySeparator: false,
    nsSeparator: false,
    supportedLngs: ["en", "es"],
    fallbackLng: "es",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translations.json",
    },
    react: {
      useSuspense: false,
    },
  });

(window as any).nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      document.querySelector("#root")
    );
  })
  .catch(console.error);
