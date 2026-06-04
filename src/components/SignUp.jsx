import React, { useState } from 'react';

export default function SignUp({ setCurrentPage, setUsername, setRole }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass, role: selectedRole })
        });
        
        const data = await response.json();
        if (response.ok) {
          setUsername(data.user.username);
          setRole(data.user.role);
          if (data.user.role === 'merchant') {
            setCurrentPage('merchant');
          } else {
            setCurrentPage('home');
          }
        } else {
          alert(data.error || 'Failed to sign up');
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
        <h1>Join Namaste China</h1>
        <p>Register as a Buyer or a Supplier and grow your trade network today.</p>
      </header>

      <section className="content-section">
        <form onSubmit={handleSubmit} className="form" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Sign Up</h2>
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Choose username" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            required 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Create password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            required 
          />
          
          <label>Role</label>
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="client">Client (Buyer)</option>
            <option value="merchant">Merchant (Seller)</option>
          </select>
          
          <button type="submit">Create Account</button>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            Already have an account?{' '}
            <span 
              onClick={() => setCurrentPage('login')} 
              style={{ color: 'var(--primary-green)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Log In
            </span>
          </p>
        </form>
      </section>
    </>
  );
}
