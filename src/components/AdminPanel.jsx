import { useState } from 'react';
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
    silver: 0,
    gold: 0,
    totalRevenue: 0
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
    const courseStats = {
      total: data.length,
      silver: data.filter(e => e.guest_type === 'Silver').length,
      gold: data.filter(e => e.guest_type === 'Gold').length,
      totalRevenue: data.reduce((sum, e) => sum + (e.payment_value || 0), 0)
    };
    setStats(courseStats);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
    setEnrollments([]);
    setStats({ total: 0, silver: 0, gold: 0, totalRevenue: 0 });
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

  const downloadCSV = () => {
    if (enrollments.length === 0) {
      alert('No data to download');
      return;
    }

    // Define CSV headers - all database fields
    const headers = [
      'ID',
      'Payment ID',
      'Order ID',
      'Name',
      'Email',
      'Mobile',
      'Company Name',
      'City',
      'Turnover',
      'Product/Service Details',
      'Nature of Business',
      'Challenges',
      'Payment Status',
      'Timestamp',
      'Guest Type',
      'Payment Value',
      'Pass Type'
    ];

    // Convert data to CSV rows - all database fields
    const rows = enrollments.map(e => [
      e.id || '',
      e.payment_id || '',
      e.order_id || '',
      e.name || '',
      e.email || '',
      e.mobile || '',
      e.company_name || '',
      e.city || '',
      e.ton_over || '',
      e.prod_serv_details || '',
      e.nature_of_business || '',
      e.challenges || '',
      e.payment_status || '',
      e.timestamp || '',
      e.guest_type || '',
      e.payment_value || '',
      e.pass_type || ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `event_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <p>Event Bookings Management</p>
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
            <p>Event Bookings Management</p>
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
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🥈</div>
            <div className="stat-info">
              <h3>{stats.silver}</h3>
              <p>Silver Delegates</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🥇</div>
            <div className="stat-info">
              <h3>{stats.gold}</h3>
              <p>Gold Delegates</p>
            </div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>₹{stats.totalRevenue.toLocaleString('en-IN')}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="table-container">
          <div className="table-header">
            <h2>Event Bookings</h2>
            <div className="table-actions">
              <span className="table-count">{enrollments.length} records</span>
              <button onClick={downloadCSV} className="download-btn">
                📥 Download CSV
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : enrollments.length === 0 ? (
            <div className="no-data">No bookings found</div>
          ) : (
            <div className="table-wrapper">
              <table className="enrollments-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Company</th>
                    <th>City</th>
                    <th>Turnover</th>
                    <th>Business</th>
                    <th>Products/Services</th>
                    <th>Challenges</th>
                    <th>Guest Type</th>
                    <th>Amount</th>
                    <th>Payment ID</th>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment, index) => (
                    <tr key={enrollment.id || index}>
                      <td>{index + 1}</td>
                      <td className="name-cell">{enrollment.name || '-'}</td>
                      <td className="email-cell">{enrollment.email || '-'}</td>
                      <td>{enrollment.mobile || '-'}</td>
                      <td className="company-cell">{enrollment.company_name || '-'}</td>
                      <td>{enrollment.city || '-'}</td>
                      <td>{enrollment.ton_over || '-'}</td>
                      <td className="business-cell">{enrollment.nature_of_business || '-'}</td>
                      <td className="products-cell">{enrollment.prod_serv_details || '-'}</td>
                      <td className="challenges-cell">{enrollment.challenges || '-'}</td>
                      <td>
                        {enrollment.guest_type ? (
                          <span className={`guest-badge ${enrollment.guest_type.toLowerCase()}`}>
                            {enrollment.guest_type}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="amount-cell">
                        {enrollment.payment_value ? `₹${enrollment.payment_value.toLocaleString('en-IN')}` : '-'}
                      </td>
                      <td className="payment-id">{enrollment.payment_id || '-'}</td>
                      <td className="payment-id">{enrollment.order_id || '-'}</td>
                      <td>
                        <span className={`status-badge ${enrollment.payment_status || 'unknown'}`}>
                          {enrollment.payment_status || 'unknown'}
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
