import { createContext, useEffect, useState, type ReactNode } from "react";
import { authAPI } from "../services/api";
import type { User } from "../services/api";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => { },
  signup: async () => { },
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // checks when component loads if user is valid or not by checking token validity
    const restoreUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const data = await authAPI.verify();
        setUser(data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreUser();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await authAPI.login(username, password);
    setUser(data.user);
  };

  const signup = async (username: string, password: string) => {
    const data = await authAPI.signup(username, password);
    setUser(data.user);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: user !== null, login, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}
