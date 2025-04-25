import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useHeaderVisibility } from '../context/HeaderVisibilityContext';
import backgroundImage from '../assets/amritaback.jpg';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { setIsHeaderVisible } = useHeaderVisibility();

  useEffect(() => {
    setIsHeaderVisible(false);
    return () => setIsHeaderVisible(true);
  }, [setIsHeaderVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
      setPasswordError(`Password must be at least ${minLength} characters long.`);
    } else if (!hasUpperCase) {
      setPasswordError('Password must include at least one uppercase letter.');
    } else if (!hasLowerCase) {
      setPasswordError('Password must include at least one lowercase letter.');
    } else if (!hasDigit) {
      setPasswordError('Password must include at least one digit.');
    } else if (!hasSpecialChar) {
      setPasswordError('Password must include at least one special character (!@#$%^&*).');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return; // Prevent submission if there's a password error

    const { username, email, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
        setErrorMessage('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering.');
    }
  };

  return (
    <div className="register-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2>Register</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        
        <button type="submit" className="submit-btn" disabled={!!passwordError}>
          Register
        </button>
        <div className="redirect-link">
          <p style={{
            backgroundColor: 'black', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '10px',
            display: 'inline-block',
            marginTop: '20px',
          }}>
            Already have an account? 
            <button onClick={() => navigate('/login') } className="register-link">Login here</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
