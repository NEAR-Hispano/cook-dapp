import React from "react";
import { Route, Routes } from "react-router-dom";
import useScreens from "./hooks/useScreens";
import useAuth from "./hooks/useAuth";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";
import { v4 as uuid } from "uuid";
import { screenInterface } from "./types";
import profileTabs from "./assets/data/profileTabs";
import ProfileScreen from "./screens/ProfileScreen";

const ConditionalRoutes = () => {
  const screens: Array<screenInterface> = useScreens();
  const isLoggedIn = useAuth();

  return (
    <Routes>
      {screens.map(({ path, exact, Component }) => (
        <Route key={uuid()} path={path} element={<Component />} />
      ))}

      <Route path="/profile" element={<ProfileScreen />}>
        {profileTabs.map(({ label, Component }) => (
          <Route key={uuid()} path={`${label}`} element={<Component />} />
        ))}
      </Route>

      <Route
        path="*"
        element={isLoggedIn ? <HomeScreen /> : <LandingScreen />}
      />
    </Routes>
  );
};

export default ConditionalRoutes;
