import { useLocation } from 'react-router-dom';
const DashboardPage = () => {
  const location = useLocation();
  const { user, message } = location.state || {};

  return (

    <div style={{ color: "var(--color-text)" }} className="justify-center items-center flex flex-col min-h-screen " >
      <h1  className="text-4xl">
        Dashboard Page
      </h1>
       <p>  Welcome, {user?.username}!</p>

       {message && (
        <p style={{ color: "var(--color-primary)" }} className="text-lg">
          {message}
        </p>
      )}


    </div>
  )
}

export default DashboardPage