/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
   async function getAddress() {
     const url = `https://ipapi.co/${searchTerm}/json/`;
     const results = await fetch(url);
     console.log(results);
     if (!results.ok) {
       setIsLoading(false); 
       setError(true);
       setAddress({});
     }

     const data = await results.json();
        console.log(data);
     if (data.error === true) {
       setAddress({});
       setIsLoading(false); 
       setError(true);
     } else {
       setAddress(data);
       setIsLoading(false);
       setError(false);
     }
   }
   getAddress();
 }, [searchTerm]);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        isLoading,
        setIsLoading,
        error,
        setError,
        setSearchTerm,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  return useContext(AddressContext);
};
