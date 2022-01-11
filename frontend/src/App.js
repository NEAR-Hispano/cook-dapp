import getConfig from "./config";
import "./styles/main.scss";
import Layout from "./Layout";
import ConditionalRoutes from "./ConditionalRoutes";

const { networkId } = getConfig(process.env.NODE_ENV || "development");

const App = () => {
  return (
    <Layout>
      <ConditionalRoutes />
    </Layout>
  );
};

export default App;
