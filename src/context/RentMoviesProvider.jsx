import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const RentMoviesContext = createContext();


export const RentMoviesProvider = ({ children }) => {
  const [rentMovies, setRentMovies] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("rentMovies", (rentMoviesList) => {
      setRentMovies(rentMoviesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <RentMoviesContext.Provider value={ rentMovies }>
      {children}
    </RentMoviesContext.Provider>
  );
};