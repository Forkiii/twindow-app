import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import './styles/index.css';
import ThemeProvider, { useTheme } from './context/ThemeContext';
import FriendContextProvider from './context/FriendContext';
import ProtectedLayout from './Layout/ProtectedLayout';
function AppBackground({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
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
        <FriendContextProvider>
          <AppBackground>      <BrowserRouter>
            {/* NOT Protected */}
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              {/*  Protected */}
              <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </BrowserRouter>
          </AppBackground>
        </FriendContextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
