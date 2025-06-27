import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookingSuccess.css';

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  const handleGoToFlights = () => {
    navigate('/flights');
  };

  return (
    <div className="success-container">
      <h2>✅ Booking Confirmed!</h2>

      {booking ? (
        <div className="success-details">
          <p><strong>Airline:</strong> {booking.flightId.airline}</p>
          <p><strong>From:</strong> {booking.flightId.departure}</p>
          <p><strong>To:</strong> {booking.flightId.destination}</p>
          <p><strong>Total Passengers:</strong> {booking.passengerDetails.length}</p>
          <h4>Passenger Details:</h4>
          <ul>
            {booking.passengerDetails.map((p, index) => (
              <li key={index}>{p.name} - {p.email}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Booking details not available.</p>
      )}

      <button onClick={handleGoToFlights}>Back to Flights</button>
    </div>
  );
}

export default BookingSuccess;
