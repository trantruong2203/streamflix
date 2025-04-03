import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const AccountsContext = createContext();


export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("accounts", (accountsList) => {
      setAccounts(accountsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);
console.log(accounts);

  return (
    <AccountsContext.Provider value={accounts}>
      {children}
    </AccountsContext.Provider>
  );
};