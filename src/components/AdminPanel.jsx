import { useState, useEffect } from 'react';
import SEOHead from './SEOHead';
import '../styles/AdminPanel.css';

const API_BASE_URL = 'https://api.namastechina.org';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    basic: 0,
    advance: 0,
    master: 0
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/enrollments`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setEnrollments(data.data);
        calculateStats(data.data);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      basic: data.filter(e => e.course === 'BASIC').length,
      advance: data.filter(e => e.course === 'ADVANCE').length,
      master: data.filter(e => e.course === 'MASTER').length
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
    setEnrollments([]);
    setStats({ total: 0, basic: 0, advance: 0, master: 0 });
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/enrollments`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.data);
        calculateStats(data.data);
      }
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEOHead 
          title="Admin Login - Namaste China"
          description="Admin panel for managing Chinese course enrollments"
          keywords="admin, login, panel"
        />
        
        <div className="admin-login-page">
          <div className="login-container">
            <div className="login-header">
              <h1>🔐 Admin Login</h1>
              <p>Chinese Course Management</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Admin Panel - Namaste China"
        description="Manage Chinese course enrollments"
        keywords="admin, panel, enrollments"
      />
      
      <div className="admin-panel">
        <div className="admin-header">
          <div className="admin-title">
            <h1>📊 Admin Dashboard</h1>
            <p>Chinese Course Enrollments</p>
          </div>
          <div className="admin-actions">
            <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
              🔄 Refresh
            </button>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Enrollments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{stats.basic}</h3>
              <p>Basic Course</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-info">
              <h3>{stats.advance}</h3>
              <p>Advance Course</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <h3>{stats.master}</h3>
              <p>Master Course</p>
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="table-container">
          <div className="table-header">
            <h2>Recent Enrollments</h2>
            <span className="table-count">{enrollments.length} records</span>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="table-wrapper">
              <table className="enrollments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Location</th>
                    <th>Course</th>
                    <th>Payment ID</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>{enrollment.id}</td>
                      <td className="name-cell">{enrollment.name}</td>
                      <td>{enrollment.email}</td>
                      <td>{enrollment.mobile}</td>
                      <td>
                        <div className="location-cell">
                          {enrollment.city}, {enrollment.state}
                          <span className="country">{enrollment.country}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`course-badge ${enrollment.course.toLowerCase()}`}>
                          {enrollment.course}
                        </span>
                      </td>
                      <td className="payment-id">{enrollment.payment_id}</td>
                      <td>
                        <span className={`status-badge ${enrollment.payment_status}`}>
                          {enrollment.payment_status}
                        </span>
                      </td>
                      <td className="date-cell">{formatDate(enrollment.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
