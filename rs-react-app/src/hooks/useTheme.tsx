'use client'

import { createContext, ReactNode, useContext, useState } from 'react';

export const useTheme = () => useContext(ThemeContext);

export const useThemeUpdate = () => useContext(ThemeContextUpdate);

const ThemeContext = createContext(false);
const ThemeContextUpdate = createContext(function () {});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeContextUpdate.Provider value={toggleTheme}>
        {children}
      </ThemeContextUpdate.Provider>
    </ThemeContext.Provider>
  );
};
