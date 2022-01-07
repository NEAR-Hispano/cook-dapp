import getConfig from "./config";
import "./styles/main.scss";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import screens from "./assets/data/screens";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

const App = () => {
  return (
    <Layout>
      <Routes>
        {screens.map(({ path, exact, Component }) => (
          <Route key={Component} path={path} exact={exact} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
