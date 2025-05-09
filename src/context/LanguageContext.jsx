// src/context/LanguageContext.js

import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    try {
      return localStorage.getItem("locale") || "en"; // Varsayılan dil
    } catch {
      return "en"; // Hata durumunda varsayılan dil
    }
  });

  const changeLanguage = (lang) => {
    setLocale(lang);
    try {
      localStorage.setItem("locale", lang); // Seçilen dili kaydet
    } catch {
      console.error("Dil değiştirilemedi.");
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
