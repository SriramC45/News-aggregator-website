import React, { useState, useEffect } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useHeaderVisibility } from '../context/HeaderVisibilityContext'; // Import the context
import backgroundImage from '../assets/amritaback.jpg'; // Import image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [hiiMessage, setHiiMessage] = useState('');  // State for the "Hii" message
  const navigate = useNavigate();
  const { setIsHeaderVisible } = useHeaderVisibility(); // Access context to update header visibility

  useEffect(() => {
    setIsHeaderVisible(false); // Hide the header when on the login page
    return () => setIsHeaderVisible(true); // Reset header visibility when leaving the login page
  }, [setIsHeaderVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        // Successfully logged in
        setSuccessMessage('Login successful');
        setError('');
        setHiiMessage('Hii');  // Set the "Hii" message
        setTimeout(() => {
          setHiiMessage(''); // Clear the "Hii" message after 3 seconds
        }, 3000);

        // Update the 'active' status to 1 when the user logs in successfully
        const updateResponse = await fetch('http://localhost:5000/api/auth/updateActiveStatus', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (updateResponse.ok) {
          console.log('Active status updated to 1');
        } else {
          console.error('Failed to update active status');
        }

        navigate('/All-News'); // Redirect to the main page
      } else {
        setError(result.message || 'Login failed');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Error occurred during login');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>Login</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      
      {/* Show "Hii" message if there is a success */}
      {hiiMessage && (
        <div className="hii-message">
          {hiiMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>

        {/* Moved the "Don't have an account?" section inside the form */}
        <p style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',   // Curved corners
          display: 'inline-block', // Ensures it doesn't take up full width
          marginTop: '20px',       // Optional: Adds space between elements
        }}>Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="register-link">Register here</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
