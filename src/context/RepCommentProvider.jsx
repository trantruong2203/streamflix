import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const RepCommentContext = createContext();


export const RepCommentProvider = ({ children }) => {
  const [repComments, setRepComments] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("repComments", (repCommentsList) => {
      setRepComments(repCommentsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <RepCommentContext.Provider value={ repComments }>
      {children}
    </RepCommentContext.Provider>
  );
};