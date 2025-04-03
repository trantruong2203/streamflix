import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const EpisodesContext = createContext();


export const EpisodesProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("episodes", (episodesList) => {
      setEpisodes(episodesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <EpisodesContext.Provider value={ episodes }>
      {children}
    </EpisodesContext.Provider>
  );
};