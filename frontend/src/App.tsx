import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
// ==================== MAIN APP COMPONENT ====================
function App() {
  return (
    <BrowserRouter>
    {/* NOT Protected */}
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
    {/*  Protected */}    
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>   
    </BrowserRouter>
  );
}

export default App;
