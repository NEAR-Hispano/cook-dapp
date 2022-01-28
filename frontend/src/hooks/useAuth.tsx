import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => setAuth((window as any).walletConnection.isSignedIn()), []);
  return auth;
};

export default useAuth;
