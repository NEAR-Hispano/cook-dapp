import getConfig from "./config";
import "./styles/main.scss";
import Layout from "./Layout";
import ConditionalRoutes from "./ConditionalRoutes";
import AppContextProvider from "./context/AppContextProvider";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

const App = () => {
  return (
    <AppContextProvider>
      <Layout>
        <ConditionalRoutes />
      </Layout>
    </AppContextProvider>
  );
};

export default App;
