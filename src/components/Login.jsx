import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUsername, setRole }) {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass })
        });
        
        const data = await response.json();
        if (response.ok) {
          setUsername(data.user.username);
          setRole(data.user.role);
          if (data.user.role === 'merchant') {
            navigate('/merchant');
          } else {
            navigate('/');
          }
        } else {
          alert(data.error || 'Invalid credentials');
        }
      } catch (err) {
        console.error(err);
        alert('Could not connect to the backend server.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>Welcome Back</h1>
        <p>Login to access your global B2B supplier workspace.</p>
      </header>

      <section className="content-section">
        <form onSubmit={handleSubmit} className="form" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Login</h2>
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Type 'merchant' to see merchant features"
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            required 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter password"
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            required 
          />
          
          <button type="submit">Login</button>
          
          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/signup')} 
              style={{ color: 'var(--primary-green)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign Up
            </span>
          </p>
        </form>
      </section>
    </>
  );
}
