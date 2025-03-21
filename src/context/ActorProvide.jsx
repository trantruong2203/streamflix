import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ActorContext = createContext();


export const ActorProvider = ({ children }) => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("actors", (actorsList) => {
      setActors(actorsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ActorContext.Provider value={actors}>
      {children}
    </ActorContext.Provider>
  );
};