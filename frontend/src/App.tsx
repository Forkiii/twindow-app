import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import './styles/index.css';
import ThemeProvider, { useTheme } from './context/ThemeContext';
function AppBackground({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    // <div className={`gradientbg ${theme}`}>
    <div className={`gradientbg ${theme}`}>
      {children}
    </div>
  );
}
// ==================== MAIN APP COMPONENT ====================
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppBackground>      <BrowserRouter>
          {/* NOT Protected */}
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            {/*  Protected */}
            <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
        </AppBackground>

      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
