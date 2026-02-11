import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../services/api';
// ==================== PROTECTED ROUTE COMPONENT ====================
// This wraps any route that requires authentication
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      // No token = not authenticated
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      // Verify token 
      try {
        await authAPI.verify();
        setIsAuthenticated(true);
      } catch (error) {
        // Invalid token 
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    };

    checkAuth();
  }, []);

  // loading
  if (isAuthenticated === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  // !Authenticated 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return <>{children}</>;
};
