import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const PlansContext = createContext();


export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("plans", (plansList) => {
      setPlans(plansList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <PlansContext.Provider value={ plans }>
      {children}
    </PlansContext.Provider>
  );
};