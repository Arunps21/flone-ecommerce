import React, { createContext, useState, useLayoutEffect, useContext } from "react";

// Create the context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default to light theme

  // Apply the theme to the document immediately
  const applyTheme = (theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  };

  // Apply theme as soon as possible using useLayoutEffect
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    // If there's a theme in localStorage, use it
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      // If no theme is stored, default to light theme
      setTheme("light");
      applyTheme("light");
    }
  }, []); // Empty dependency ensures this runs only once on mount

  // Save theme to localStorage when it changes
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save to localStorage
    applyTheme(newTheme); // Apply theme to document
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
