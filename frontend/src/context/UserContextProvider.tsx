import { createContext, FC, useState } from "react";
import { userInterface } from "../types";

export const UserContext = createContext<
  [
    userInterface | null,
    React.Dispatch<React.SetStateAction<userInterface | null>> | null
  ]
>([null, null]);

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<userInterface | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
