import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const FeatureContext = createContext();


export const FeatureProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("features", (featuresList) => {
      setFeatures(featuresList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <FeatureContext.Provider value={features}>
      {children}
    </FeatureContext.Provider>
  );
};