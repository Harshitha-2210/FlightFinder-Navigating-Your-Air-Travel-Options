import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FlightOperatorDashboard.css';
import { useNavigate } from 'react-router-dom';  // ✅ For navigation to Edit Page

function FlightOperatorFlights() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/flights/my-flights', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, []);

  const handleEdit = (flightId) => {
    navigate(`/operator/edit-flight/${flightId}`);
  };

  return (
    <div className="page-container">
      <h2 className="section-heading">My Added Flights</h2>
      {flights.map(flight => (
        <div key={flight._id} className="card">
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
          <p><strong>Departure:</strong> {flight.departure}</p>
          <p><strong>Destination:</strong> {flight.destination}</p>
          <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
          <p><strong>Arrival Time:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
          <p><strong>Price:</strong> ₹{flight.price}</p>
          <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
          <button onClick={() => handleEdit(flight._id)} className="edit-button">Edit</button>
        </div>
      ))}
    </div>
  );
}

export default FlightOperatorFlights;
