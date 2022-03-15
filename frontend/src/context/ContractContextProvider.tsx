import { Contract } from "../Contract";
import { createContext, FC } from "react";
import getContract from "../Contract";

export const ContractContext = createContext<Contract | null>(null);

const ContractContextProvider: FC = ({ children }) => {
   const contract: Contract = getContract();

   return (
       <ContractContext.Provider value={contract}>
           {children}
       </ContractContext.Provider>
   )

}

export default ContractContextProvider

