import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/userContext'; 
import '../css/login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const { username } = await response.json();
        loginUser(username); 
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        alert(errorData.message); 
      }
    } catch (error) {
      // Handling network or other errors
      setErrorMessage('Error during login. Please try again.');
      alert(errorMessage); 
    }
  };

  return (
    <div className="overlay">
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
