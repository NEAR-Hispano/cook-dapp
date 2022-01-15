import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import { useContract } from "../context/ContractContextProvider";

const HomeScreen = () => {
  const [user, setUser] = useUser();
  const contract = useContract();

  useEffect(() => {
    if (!user) {
      contract.getUser({}).then((res) => setUser(res));
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return <div>Home</div>;
};

export default HomeScreen;
