import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SearchAPIContext = createContext();

export const SearchAPIProvider = ({ children }) => {
  const [searchAPI, setSearchAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  const fetchSearchAPI = async () => {
    try {
      const res = await axios.get(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=10&sort_field=modified.time&sort_type=asc`);     
      if (res.data && res.data.data && res.data.data.items) {
        setSearchAPI(res.data.data.items);
      } else {
        setSearchAPI([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching searchAPI:', err.message);
      setSearchAPI([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchAPI();
  }, [keyword]);

  return (
    <SearchAPIContext.Provider value={{ searchAPI, loading, keyword, setKeyword }}>
      {children}
    </SearchAPIContext.Provider>
  );
};
