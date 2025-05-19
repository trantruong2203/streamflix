import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("messages", (messagesList) => {
        setChat(messagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
  <ChatContext.Provider value={chat}>
    {children}
  </ChatContext.Provider>
  );
};