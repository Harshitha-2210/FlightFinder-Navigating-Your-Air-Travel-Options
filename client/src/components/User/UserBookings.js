import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserBookings.css';

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/bookings/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error.response?.data || error.message);
      alert('Failed to load your bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/bookings/cancel/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Booking canceled successfully!');
      fetchUserBookings();  // ✅ Refresh bookings list
    } catch (error) {
      console.error('Error canceling booking:', error.response?.data || error.message);
      alert('Failed to cancel booking.');
    }
  };

  if (loading) return <p>Loading your bookings...</p>;

  if (bookings.length === 0) return <p>You have no bookings yet.</p>;

  return (
    <div className="user-bookings-page">
      <h2>My Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="booking-card">
          <h3>Flight: {booking.flightId.airline} ({booking.flightId.flightNumber})</h3>
          <p><strong>From:</strong> {booking.flightId.departure}</p>
          <p><strong>To:</strong> {booking.flightId.destination}</p>
          <p><strong>Departure:</strong> {new Date(booking.flightId.departureTime).toLocaleString()}</p>
          <p><strong>Total Passengers:</strong> {booking.passengers}</p>
          <h4>Passenger Details:</h4>
          <ul>
            {booking.passengerDetails.map((p, idx) => (
              <li key={idx}>{p.name} - {p.email}</li>
            ))}
          </ul>
          <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
          <button className="cancel-button" onClick={() => handleCancel(booking._id)}>Cancel Booking</button>
        </div>
      ))}
    </div>
  );
}

export default UserBookings;
