import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departureDate: '',
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = `?from=${searchData.from}&to=${searchData.to}&date=${searchData.departureDate}`;
    navigate(`/flights${query}`);
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata', 'Chennai'];

  return (
    <div>
      {/* Hero Search Section */}
      <div className="home-hero">
        <div className="overlay">
          <div className="search-box">
            <h1>Find Your Next Flight ✈️</h1>
            <form onSubmit={handleSearch}>
              <select
                name="from"
                value={searchData.from}
                onChange={handleChange}
                required
              >
                <option value="">From (Select City)</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>

              <select
                name="to"
                value={searchData.to}
                onChange={handleChange}
                required
              >
                <option value="">To (Select City)</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>

              <input
                type="date"
                name="departureDate"
                value={searchData.departureDate}
                onChange={handleChange}
                required
              />

              <button type="submit">Search Flights</button>
            </form>
          </div>
        </div>
      </div>

      {/* Full-width About Section */}
      <div className="about-section">
        <h2>About AirVoyager ✈️</h2>
        <p>
          Welcome to <strong>AirVoyager</strong> – your one-stop destination for hassle-free flight bookings.  
          We provide an easy-to-use platform for finding, comparing, and booking flights across major cities in India.  
          Whether you're flying for business or vacation, AirVoyager ensures that you get the best options at affordable prices.
        </p>

        <p>
          Features include:
          <ul>
            <li>✅ Real-time Flight Search</li>
            <li>✅ Easy Ticket Booking</li>
            <li>✅ Manage Your Bookings</li>
            <li>✅ Flight Operator Management</li>
            <li>✅ Admin Control for User and Flight Approvals</li>
          </ul>
        </p>

        <p>
          Start your journey with AirVoyager today and experience the skies like never before!
        </p>
      </div>
    </div>
  );
}

export default Home;
