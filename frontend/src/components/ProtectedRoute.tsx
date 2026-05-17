import { Navigate } from 'react-router';
import {useAuth} from '../context/AuthContext'
import type { ReactNode } from 'react';
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {loading ,isAuthenticated} = useAuth()
  //checking auth status
  if (loading) return <div className="fixed inset-0  backdrop-blur-sm flex flex-col items-center justify-center gap-4">
  <div className="w-10 h-10 border-4 border-[var(--color-text-muted)] border-t-[var(--color-accent)] rounded-full animate-spin" />
  <p className="text-base font-medium">Loading</p>
<p className="text-sm text-[var(--color-text-muted)]">Please wait</p>
</div>
  if (!isAuthenticated) return <Navigate to='/login' replace />
  return children
};
