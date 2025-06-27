// src/components/AdminFlightList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFlightList.css';

function AdminFlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/flights/all', {
          headers: { Authorization: `Bearer ${token}` }  // ✅ In case you add auth later
        });
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="admin-flights-page">
      <h2>All Flights (Admin View)</h2>
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        flights.map((flight) => (
          <div key={flight._id} className="admin-flight-card">
            <h3>{flight.airline} - {flight.flightNumber}</h3>
            <p><strong>From:</strong> {flight.departure}</p>
            <p><strong>To:</strong> {flight.destination}</p>
            <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p><strong>Price:</strong> ₹{flight.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminFlightList;
