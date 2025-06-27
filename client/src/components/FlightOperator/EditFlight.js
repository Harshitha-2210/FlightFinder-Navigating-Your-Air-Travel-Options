import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditFlight.css';  // ✅ Reuse your existing CSS or create new

function EditFlight() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState({
    airline: '',
    flightNumber: '',
    departure: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: '',
  });

  useEffect(() => {
    const fetchFlightDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/flights/${flightId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const flight = response.data;

        // ✅ Format ISO dates to HTML input datetime-local
        setFlightData({
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          departure: flight.departure,
          destination: flight.destination,
          departureTime: flight.departureTime.slice(0, 16),  // for datetime-local
          arrivalTime: flight.arrivalTime.slice(0, 16),
          price: flight.price,
          availableSeats: flight.availableSeats,
        });
      } catch (error) {
        console.error('Error fetching flight:', error);
        alert('Failed to load flight details');
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:5000/flights/${flightId}`, flightData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Flight updated successfully!');
      navigate('/flightoperator/flights');
    } catch (error) {
      console.error('Error updating flight:', error);
      alert('Failed to update flight');
    }
  };

  return (
    <div className="page-container">
      <h2 className="section-heading">Edit Flight</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label>Airline:</label>
        <input type="text" name="airline" value={flightData.airline} onChange={handleChange} required />

        <label>Flight Number:</label>
        <input type="text" name="flightNumber" value={flightData.flightNumber} onChange={handleChange} required />

        <label>Departure:</label>
        <input type="text" name="departure" value={flightData.departure} onChange={handleChange} required />

        <label>Destination:</label>
        <input type="text" name="destination" value={flightData.destination} onChange={handleChange} required />

        <label>Departure Time:</label>
        <input type="datetime-local" name="departureTime" value={flightData.departureTime} onChange={handleChange} required />

        <label>Arrival Time:</label>
        <input type="datetime-local" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} required />

        <label>Price (₹):</label>
        <input type="number" name="price" value={flightData.price} onChange={handleChange} required />

        <label>Available Seats:</label>
        <input type="number" name="availableSeats" value={flightData.availableSeats} onChange={handleChange} required />

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditFlight;
