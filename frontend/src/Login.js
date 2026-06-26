import './Login.css';
import logo from './logo.png';
import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Accept ANY email and password
    if (email && password) {
      // Clear any errors
      setError('');
      // Call the login function from App.js
      onLogin();
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="LabelReach Logo" className="login-logo" />
          <h1>LabelReach</h1>
          <p>Instructor Management System</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div style={{
              background: '#fce4ec',
              color: '#c62828',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          🔑 Any email and password works for demo
        </p>
      </div>
    </div>
  );
}

export default Login;