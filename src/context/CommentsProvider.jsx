import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const CommentsContext = createContext();


export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("comments", (commentsList) => {
      setComments(commentsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <CommentsContext.Provider value={comments}>
      {children}
    </CommentsContext.Provider>
  );
};