import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme()
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    setIsDark(theme == "dark")
  }, [theme]);
  return (
    <button
      className={`theme-toggle ${isDark ? 'dark' : ''}`}
      onClick={toggleTheme}>
      <span className="theme-icon">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
export default ThemeButton;