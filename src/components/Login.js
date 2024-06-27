import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './loader';
import './Login.css';
import Cookies from 'js-cookie';

const BASE_URL = "https://mybackend-2.onrender.com";

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        identifier,
        password,
      });

      const { token } = response.data;
      Cookies.set('auth', 'true', { expires: 1 });  // Set cookie to expire in 1 day
      localStorage.setItem('token', token);
      localStorage.setItem('auth', 'true');
       // Set auth flag in localStorage

      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError(error.response?.data?.error || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <label htmlFor="identifier">Email or Matric No</label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? <Loader /> : 'Login'}
        </button>
        <button type="button" className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Login;