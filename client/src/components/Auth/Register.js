import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/register', formData);

      if (formData.role === 'flightoperator') {
        alert('Registration successful! Please wait for admin approval before you can login.');
        navigate('/login');
      } else {
        // ✅ Auto login only for normal users
        const loginResponse = await axios.post('http://localhost:5000/users/login', {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('token', loginResponse.data.token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>AirVoyager - User Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* ✅ Dropdown for role */}
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="flightoperator">Flight Operator</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
