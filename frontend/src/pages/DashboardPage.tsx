import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function DashboardPage() {
  const [isDark,setIsDark] = useState(true)

  const {theme,toggleTheme} = useTheme()
  useEffect(()=>{
    setIsDark(theme=="dark")
    console.log(isDark);
  }, [theme]);
  return(
    <div className="flex flex-col gap-5">
       <button 
  className={`theme-toggle ${isDark ? 'dark' : ''}`}
  onClick={toggleTheme}>
  <span className="theme-icon">
    {isDark ? '🌙' : '☀️'}
  </span> 
</button>
        

    </div>
  )
};
