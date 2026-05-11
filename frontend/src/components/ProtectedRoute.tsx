import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|null> (null);
  useEffect(() => {
    const checkAuth = async () => {
      
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
        }else{
          setIsAuthenticated(false)
          localStorage.removeItem('token')
        }
      } catch (error) {
        setIsAuthenticated(false)
      }
      
    }
    checkAuth();
    }, [])


    //checking auth status
    if(isAuthenticated===null) return <div>Loading...</div>
    if(!isAuthenticated) return <Navigate to='/login' replace/>
    
    
    //true:
    return <>{children}</>  
};