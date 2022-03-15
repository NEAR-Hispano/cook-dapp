import { useContext } from "react";
import { ContractContext } from "../context/ContractContextProvider";

const useContract = () => {
  return useContext(ContractContext);
};

export default useContract;
