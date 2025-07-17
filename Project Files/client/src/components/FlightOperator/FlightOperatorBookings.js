import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FlightOperatorDashboard.css';

function FlightOperatorBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/bookings/operator/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="page-container">
      <h2 className="section-heading">Bookings on My Flights</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="card">
          <h4>Flight: {booking.flightId.airline} ({booking.flightId.flightNumber})</h4>
          <p><strong>From:</strong> {booking.flightId.departure}</p>
          <p><strong>To:</strong> {booking.flightId.destination}</p>
          <p><strong>Departure:</strong> {new Date(booking.flightId.departureTime).toLocaleString()}</p>

          <p><strong>Total Passengers:</strong> {booking.passengers}</p>

          <h4>Passenger Details:</h4>
          <p>{booking.userId.name} - {booking.userId.email}</p>

          <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default FlightOperatorBookings;
