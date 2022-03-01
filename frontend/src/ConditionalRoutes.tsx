import { Route, Routes, Navigate } from "react-router-dom";
import useScreens from "./hooks/useScreens";
import useAuth from "./hooks/useAuth";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";
import { v4 as uuid } from "uuid";
import { screenInterface } from "./types";

const ConditionalRoutes = () => {
  const screens: Array<screenInterface> = useScreens();
  const isLoggedIn = useAuth();

  return (
    <Routes>
      {screens.map(({ path, Component }) => (
        <Route key={uuid()} path={path} element={<Component />} />
      ))}

      <Route
        path="*"
        element={isLoggedIn ? <HomeScreen /> : <LandingScreen />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ConditionalRoutes;
