import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authAPI } from "../services/api";
import type { User } from "../services/api";
type ContextValue = {
  user: User | null;
  isAuthenticated: boolean
  loading: boolean
  signup: (username: string, password: string) => Promise<void>
  login: (username: string, password: string) => Promise<void>
}
const AuthContext = createContext<ContextValue>({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},   
  signup: async () => {},  
})
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);


  //auth useeffect
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setUser(null)
        setLoading(false)
        return  
      }
      try {
        const data = await authAPI.verify()
        setUser(data.user)
        if (!user) {
        }

      } catch (error) {
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }
    restoreUser()
  }, []);

  //theme useffect
 
  const login = async (username: string, password: string): Promise<void> => {
    try {
      const res = await authAPI.login(username,password);
      setUser(res.user)
      localStorage.setItem("token", res.token);
      console.log(res.message);
    } catch (error) {
      throw error
    }
  }
  const signup = async (username: string, password: string): Promise<void> => {
try {
      const res = await authAPI.signup(username,password);
      setUser(res.user)
      localStorage.setItem("token",res.token)
      console.log(res.message);
      
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, signup, isAuthenticated: user !== null, loading, user
       }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

