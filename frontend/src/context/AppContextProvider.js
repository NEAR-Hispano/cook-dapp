import ContractContextProvider from "./ContractContextProvider";
import MobileMenuProvider from "./MobileMenuProvider";
import UserContextProvider from "./UserContextProvider";

const AppContextProvider = ({ children }) => {
  return (
    <ContractContextProvider>
      <UserContextProvider>
        <MobileMenuProvider>{children}</MobileMenuProvider>
      </UserContextProvider>
    </ContractContextProvider>
  );
};

export default AppContextProvider;
