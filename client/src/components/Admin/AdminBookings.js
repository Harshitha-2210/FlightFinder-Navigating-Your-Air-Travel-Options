import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBookings.css';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/bookings/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error.response?.data || error.message);
        alert('Failed to load bookings. Are you logged in as Admin?');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin-bookings-page">
      <h2>All User Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="booking-card">
          <h3>Flight: {booking.flightId.airline} ({booking.flightId.flightNumber})</h3>
          <p><strong>User:</strong> {booking.userId.name} ({booking.userId.email})</p>
          <p><strong>Total Passengers:</strong> {booking.passengers}</p>
          <ul>
            {booking.passengerDetails.map((p, idx) => (
              <li key={idx}>{p.name} - {p.email}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;
