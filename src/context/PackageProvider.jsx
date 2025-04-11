import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const PackageContext = createContext();


export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("packages", (packagesList) => {
      setPackages(packagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <PackageContext.Provider value={packages}>
      {children}
    </PackageContext.Provider>
  );
};