import React, { useState } from 'react';
import axios from 'axios';
import './AddFlight.css';

function AddFlight() {
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    departure: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/flights/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Flight added successfully!');
      setFormData({
        airline: '',
        flightNumber: '',
        departure: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        availableSeats: ''
      });
    } catch (error) {
      console.error('Error adding flight:', error.response?.data || error.message);
      alert('Failed to add flight. Make sure you are logged in as Admin.');
    }
  };

  return (
    <div className="add-flight-container">
      <h2>Add New Flight ✈️</h2>
      <form className="add-flight-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="airline"
          placeholder="Airline Name"
          value={formData.airline}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          value={formData.flightNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departure"
          placeholder="Departure City"
          value={formData.departure}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination City"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="availableSeats"
          placeholder="Available Seats"
          value={formData.availableSeats}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
}

export default AddFlight;
