import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = 'dark' | 'light'
type ContextValue = {
    theme: Theme,
    toggleTheme: ()=>void
    }
const ThemeContext = createContext<ContextValue>({
    theme: 'dark',
    toggleTheme: ()=>{}
})
export default function ThemeProvider({ children }: { children: ReactNode }) {
    const savedTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState<Theme>(
        savedTheme==="light" ? "light" : "dark"
    )
    useEffect(() => {
        const checkTheme = () => {
            // theme == "dark" ? console.log("dark") : console.log("light");
        }
        checkTheme()
    }, [theme]);

    
    function toggleTheme() {
       setTheme((prevTheme) => {
  const nextTheme = prevTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  return nextTheme;
});
    }
    return <ThemeContext.Provider
    value={{toggleTheme,theme}}>{children}</ThemeContext.Provider>
}

export function useTheme(){
    const tctx=useContext(ThemeContext)
    return tctx
}
