import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">✈️ AirVoyager</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {/* ✅ Admin Navigation */}
        {token && userRole === 'admin' && (
          <>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/flights">Flights</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/pending-operators">Pending Operators</Link>
          </>
        )}

        {/* ✅ Flight Operator Navigation */}
        {token && userRole === 'flightoperator' && (
          <>
            <Link to="/flightoperator/users">Users</Link>
            <Link to="/flightoperator/bookings">Bookings</Link>
            <Link to="/flightoperator/flights">Flights</Link>
            <Link to="/admin/add-flight">Add Flight</Link>
          </>
        )}

        {/* ✅ Normal User Navigation */}
        {token && userRole === 'user' && (
          <>
            <Link to="/flights">Flights</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </>
        )}

        {/* ✅ Logout / Login/Register */}
        {token ? (
          <span onClick={handleLogout} className="navbar-link">Logout</span>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
