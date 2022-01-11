import React from "react";
import { Route, Routes } from "react-router-dom";
import useScreens from "./hooks/useScreens";
import useAuth from "./hooks/useAuth";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";

const ConditionalRoutes = () => {
  const screens = useScreens();
  const isLoggedIn = useAuth();

  return (
    <Routes>
      {screens.map(({ path, exact, Component }) => (
        <Route
          key={Component}
          path={path}
          exact={exact}
          element={<Component />}
        />
      ))}

      <Route
        path="*"
        exact
        element={isLoggedIn ? <HomeScreen /> : <LandingScreen />}
      />
    </Routes>
  );
};

export default ConditionalRoutes;
