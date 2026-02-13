import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        setUser(data.user);
        setUsername(data.user.username);
      } catch (error) {
        console.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (username === user.username) {
      setError('No changes detected');
      return;
    }

    try {
      const data = await userAPI.updateProfile({ username });
      setUser(data.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Update failed');
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
        <h1 style={styles.title}>My Profile</h1>

        {user && (
          <div>
            {!isEditing ? (
              <div style={styles.infoBox}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                
                <button 
                  onClick={() => setIsEditing(true)} 
                  style={styles.editButton}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdate} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                  />
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.buttonGroup}>
                  <button type="submit" style={styles.saveButton}>
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditing(false);
                      setUsername(user.username);
                      setError('');
                    }} 
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {success && <p style={styles.success}>{success}</p>}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/dashboard" style={styles.backLink}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
// ========================== styles ==========================
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: 'white',
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
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '4px',
    border: '1px solid #dee2e6',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
  },
  editButton: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  saveButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center' as const,
  },
  success: {
    color: 'green',
    textAlign: 'center' as const,
    marginTop: '1rem',
  },
  backLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};