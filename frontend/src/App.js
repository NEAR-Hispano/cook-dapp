import "regenerator-runtime/runtime";
import { useEffect } from "react";
import getConfig from "./config";
import "./styles/main.scss";
import Layout from "./Layout";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

const App = () => {
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract.getUser();
    }
  }, []);

  return (
    <Layout>
      {!window.walletConnection.isSignedIn() ? (
        <div>Here goes loggin page</div>
      ) : (
        <div>Here goes switch</div>
      )}
    </Layout>
  );
};

export default App;
