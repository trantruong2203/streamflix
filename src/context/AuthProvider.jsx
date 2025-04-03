import React, { createContext, useEffect, useState } from 'react';
import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../utils/Contants";
export const ContextAuth = createContext();
function AuthProvider({ children }) {
    const [accountLogin, setAccountLogin] = useState(null);

    useEffect(() => {
     setAccountLogin(getLocal("account"));
    },[]);

    const saveLocal = (key, value) => {
        try {
            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            // Mã hóa bằng AES
            const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();

            localStorage.setItem(key, encryptedValue);
            setAccountLogin(value);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };
    // Hàm giải mã để lấy lại dữ liệu từ localStorage
   const getLocal = (key) => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
  
      // Giải mã AES
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };
 const logout = () => {
     setAccountLogin(null);
     localStorage.removeItem("account");
 }
    return (
        <ContextAuth.Provider value={{ accountLogin , saveLocal, logout }}>
            {children}
        </ContextAuth.Provider>
    );
}

export default AuthProvider;