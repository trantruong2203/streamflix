import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const WatchHistoryContext = createContext();


export const WatchHistoryProvider = ({ children }) => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("watchHistory", (watchHistoryList) => {
      setWatchHistory(watchHistoryList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <WatchHistoryContext.Provider value={watchHistory}>
      {children}
    </WatchHistoryContext.Provider>
  );
};