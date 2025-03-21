import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const AuthorsContext = createContext();


export const AuthorsProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("authors", (authorslist) => {
      setAuthors(authorslist);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthorsContext.Provider value={authors}>
      {children}
    </AuthorsContext.Provider>
  );
};