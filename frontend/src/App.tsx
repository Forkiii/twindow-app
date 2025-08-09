import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import CalendarPage from './pages/CalendarPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import FriendsPage from './pages/FriendsPage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import SignupPage from './pages/SignupPage.tsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/friends' element={<FriendsPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/calendar' element={<CalendarPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App