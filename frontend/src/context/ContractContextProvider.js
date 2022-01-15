import { createContext, useContext } from "react";
import getContract from "../Contract";

const ContractContext = createContext();

export const useContract = () => {
  return useContext(ContractContext);
};

const ContractContextProvider = ({ children }) => {
   const contract = getContract();

   return (
       <ContractContext.Provider value={contract}>
           {children}
       </ContractContext.Provider>
   )

}

export default ContractContextProvider

