import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../services/api';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        setUser(data.user);
      } catch (error) {
        console.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed');
      // Still remove token and redirect even if API call fails
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard</h1>
        
        {user && (
          <div style={styles.userInfo}>
            <p style={styles.welcomeText}>Welcome back, <strong>{user.username}</strong>!</p>
            <div style={styles.infoBox}>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <div style={styles.buttonGroup}>
          <Link to="/profile" style={styles.linkButton}>
            View Profile
          </Link>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--gradient-bg)',
    backgroundImage: 'radial-gradient( circle farthest-corner at -140% 0%, var(--color-primary) 0%, var(--color-bg) 90% )',


  },
  card: {
    backgroundColor: 'var(--color-secondary)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    color: '#333',
  },
  userInfo: {
    marginBottom: '2rem',
  },
  welcomeText: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#555',
  },
  infoBox: {
    backgroundColor: 'var(--color-accent)',
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #dee2e6',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  linkButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    textAlign: 'center' as const,
  },
  logoutButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};