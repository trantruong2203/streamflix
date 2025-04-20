import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const SubscriptionsContext = createContext();


export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubcriptions] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("subscriptions", (subscriptionsList) => {
      setSubcriptions(subscriptionsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <SubscriptionsContext.Provider value={subscriptions}>
      {children}
    </SubscriptionsContext.Provider>
  );
};