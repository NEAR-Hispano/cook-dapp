// import getConfig from "./config";
import "./styles/main.scss";
import Layout from "./Layout";
import ConditionalRoutes from "./ConditionalRoutes";
import AppContextProvider from "./context/AppContextProvider";
import { FC } from "react";

// const { networkId } = getConfig(process.env.NODE_ENV || "development");

const App: FC = () => {
  return (
    <AppContextProvider>
      <Layout>
        <ConditionalRoutes />
      </Layout>
    </AppContextProvider>
  );
};

export default App;
