import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const TrailersContext = createContext();


export const TrailersProvider = ({ children }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("trailers", (trailersList) => {
      setTrailers(trailersList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <TrailersContext.Provider value={ trailers }>
      {children}
    </TrailersContext.Provider>
  );
};