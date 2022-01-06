import "regenerator-runtime/runtime";
import { useEffect } from "react";
import getConfig from "./config";
import "./styles/main.scss";
import Layout from "./Layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import screens from "./assets/data/screens";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract.getUser();
    }
    if (!window.walletConnection.isSignedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout>
      <Routes>
        {screens.map(({ path, exact, Component }) => (
          <Route path={path} exact={exact} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
