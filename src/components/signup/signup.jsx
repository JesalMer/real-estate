import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', password: '', confirmpassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Name validation: Only letters allowed
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      setError('Name should contain only letters.');
      return;
    }

    // Mobile number validation: Should start with +91 and be exactly 10 digits after +91
    if (!/^\+91(76|7[0-9]|8[0-9]|9[0-9])\d{8}$/.test(formData.mobile)) {
      setError('Mobile number must start with +91 followed by 76, 7, 8, or 9, and have 10 digits.');
      return;
    }

    // Email validation: Proper format ending with .com
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/.test(formData.email)) {
      setError('Please enter a valid email ending with .com.');
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/User/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully! Redirecting to login...');
        setFormData({ name: '', mobile: '', email: '', password: '', confirmpassword: '' });
        navigate('/login'); // Redirect to login page
      } else {
        setError(data.message || 'An error occurred. Please try again.');
        console.error('Error:', data);
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
      console.error('Network error:', error);
    }
  };

  return (
    <div className="container background">
      <div className="heading">
        <h1>Sign Up</h1>
        <p>Create an account to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="mtop shadow" method="post">
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+91XXXXXXXXXX"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
