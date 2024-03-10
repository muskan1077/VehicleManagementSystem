import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../services/config';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch( `${BASE_URL}/user/signup`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert('Signup successful!'); 
        navigate('/'); // Redirecting to login page on successful signup
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Signup failed'); 
      }
    } catch (error) {
      alert('Error during signup. Please try again.'); 
    }
  };

  return (
    <div className="overlay">
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
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
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <p className="signup-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
