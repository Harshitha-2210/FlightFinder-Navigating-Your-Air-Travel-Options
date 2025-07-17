import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './FlightList.css';

function FlightList() {
  const [flights, setFlights] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchFrom = queryParams.get('from')?.trim().toLowerCase();
  const searchTo = queryParams.get('to')?.trim().toLowerCase();
  const searchDate = queryParams.get('date');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/flights/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let filteredFlights = response.data;

        console.log('Flights from backend:', filteredFlights);
        console.log('Search Filters:', { searchFrom, searchTo, searchDate });

        if (searchFrom) {
          filteredFlights = filteredFlights.filter(flight =>
            flight.departure.toLowerCase().trim() === searchFrom
          );
        }

        if (searchTo) {
          filteredFlights = filteredFlights.filter(flight =>
            flight.destination.toLowerCase().trim() === searchTo
          );
        }

        if (searchDate) {
          filteredFlights = filteredFlights.filter(flight => {
            const flightDate = new Date(flight.departureTime).toISOString().split('T')[0];
            return flightDate === searchDate;
          });
        }

        setFlights(filteredFlights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, [searchFrom, searchTo, searchDate]);

  const handleBookNow = (flightId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a flight');
      navigate('/login', { state: { from: '/flights' } });
    } else {
      navigate(`/book/${flightId}`);
    }
  };

  return (
    <div className="flights-page">
      <h2>Available Flights</h2>

      {flights.length === 0 ? (
        <p>No flights available for the selected filters.</p>
      ) : (
        flights.map(flight => (
          <div key={flight._id} className="flight-card">
            <h3>{flight.airline} ({flight.flightNumber})</h3>
            <p><strong>From:</strong> {flight.departure}</p>
            <p><strong>To:</strong> {flight.destination}</p>
            <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p><strong>Price:</strong> ₹{flight.price}</p>
            <button onClick={() => handleBookNow(flight._id)}>Book Now</button>
          </div>
        ))
      )}
    </div>
  );
}

export default FlightList;
