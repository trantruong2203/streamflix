import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const CharacterContext = createContext();


export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("characters", (charactersList) => {
        setCharacters(charactersList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
  <CharacterContext.Provider value={characters}>
    {children}
  </CharacterContext.Provider>
  );
};