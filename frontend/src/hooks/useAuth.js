import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => setAuth(window.walletConnection.isSignedIn()), []);
  return auth;
};

export default useAuth;
