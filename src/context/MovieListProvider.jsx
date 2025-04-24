import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const MovieListContext = createContext();


export const MovieListProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("movieList", (movieList) => {
      setMovieList(movieList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <MovieListContext.Provider value={movieList}>
      {children}
    </MovieListContext.Provider>
  );
};