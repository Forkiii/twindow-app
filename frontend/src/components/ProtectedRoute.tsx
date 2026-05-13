import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router';
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const checkAuth = async () => {
    //check token and if it doesnt exist set auth to false 
    //if it exists verify with backend and set auth accordingly
    const token = localStorage.getItem('token')
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
      }
    } catch (error) {
      setIsAuthenticated(false)
    }

  }




  useEffect(() => {
    checkAuth();
  }, [])
  //checking auth status
  if (isAuthenticated === null) return <div className="fixed inset-0  backdrop-blur-sm flex flex-col items-center justify-center gap-4">
  <div className="w-10 h-10 border-4 border-[var(--color-text-muted)] border-t-[var(--color-accent)] rounded-full animate-spin" />
  <p className="text-base font-medium">Loading</p>
<p className="text-sm text-[var(--color-text-muted)]">Please wait</p>
</div>
  if (!isAuthenticated) return <Navigate to='/login' replace />


  //true:
  return <>{children}</>
};