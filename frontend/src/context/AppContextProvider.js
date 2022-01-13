import MobileMenuProvider from "./MobileMenuProvider";

const AppContextProvider = ({ children }) => {
  return (
    <>
      <MobileMenuProvider>{children}</MobileMenuProvider>
    </>
  );
};

export default AppContextProvider;
