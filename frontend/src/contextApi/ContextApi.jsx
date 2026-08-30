import { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

  const [token, setToken] = useState(getToken);

  const getSavedTheme = () => {
    const saved = localStorage.getItem("THEME_MODE");
    if (saved) return saved;
    return "dark"; // Default theme
  };

  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("THEME_MODE", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const sendData = {
    token,
    setToken,
    theme,
    setTheme,
    toggleTheme,
  };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  return context;
};