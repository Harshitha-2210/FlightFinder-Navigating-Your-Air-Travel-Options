import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookFlight.css';

function BookFlight() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([{ name: '', email: '' }]);

  useEffect(() => {
  const fetchFlight = async () => {
    const response = await axios.get(`http://localhost:5000/flights/${flightId}`);
    setFlight(response.data);
  };
  fetchFlight();
}, [flightId]);


  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPassengers(count);

    // Adjust passengerDetails array size
    const updatedDetails = [...passengerDetails];
    while (updatedDetails.length < count) {
      updatedDetails.push({ name: '', email: '' });
    }
    while (updatedDetails.length > count) {
      updatedDetails.pop();
    }
    setPassengerDetails(updatedDetails);
  };

  const handlePassengerDetailChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };
  const handleBooking = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Make sure you save userId during login

    const response = await axios.post(
      'http://localhost:5000/bookings/book',
      {
        userId,
        flightId,
        passengers,
        passengerDetails
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate('/booking-success', { state: { booking: response.data.booking } });
  } catch (error) {
    console.error('Error booking flight:', error.response?.data || error.message);
    alert('Booking failed.');
  }
};


  if (!flight) return <p>Loading flight details...</p>;

  return (
    <div className="book-flight-container">
      <h2>Book Flight - {flight.airline} ({flight.flightNumber})</h2>
      <p><strong>From:</strong> {flight.departure}</p>
      <p><strong>To:</strong> {flight.destination}</p>
      <p><strong>Price:</strong> ₹{flight.price}</p>

      <label>Number of Passengers:</label>
      <input
        type="number"
        min="1"
        max={flight.availableSeats}
        value={passengers}
        onChange={handlePassengerCountChange}
      />

      {passengerDetails.map((p, index) => (
        <div key={index} className="passenger-form">
          <input
            type="text"
            placeholder={`Passenger ${index + 1} Name`}
            value={p.name}
            onChange={(e) => handlePassengerDetailChange(index, 'name', e.target.value)}
          />
          <input
            type="email"
            placeholder={`Passenger ${index + 1} Email`}
            value={p.email}
            onChange={(e) => handlePassengerDetailChange(index, 'email', e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookFlight;
