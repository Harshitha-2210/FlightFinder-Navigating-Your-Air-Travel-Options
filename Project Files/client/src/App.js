import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import FlightList from './components/User/FlightList';
import BookFlight from './components/User/BookFlight';
import AdminBookings from './components/Admin/AdminBookings';
import UserList from './components/User/UserList';
import UserBookings from './components/User/UserBookings';
import BookingSuccess from './components/User/BookingSuccess';
import AddFlight from './components/FlightOperator/AddFlight';
import AdminFlightList from './components/Admin/AdminFlightList';
import Home from './components/Home';
import NavBar from './components/NavBar';
import FlightOperatorFlights from './components/FlightOperator/FlightOperatorFlights';
import FlightOperatorBookings from './components/FlightOperator/FlightOperatorBookings';
import FlightOperatorUsers from './components/FlightOperator/FlightOperatorUsers';
import AdminPendingOperators from "./components/Admin/AdminPendingOperators";
import EditFlight from './components/FlightOperator/EditFlight';

function App() {
  return (
    <Router>
       <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<FlightList />} />
        <Route path="/book/:flightId" element={<BookFlight />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/admin/add-flight" element={<AddFlight />} />
        <Route path="/admin/flights" element={<AdminFlightList />} />
        <Route path="/my-bookings" element={<UserBookings />} />
        <Route path="/flightoperator/flights" element={<FlightOperatorFlights />} />
        <Route path="/flightoperator/bookings" element={<FlightOperatorBookings />} />
        <Route path="/flightoperator/users" element={<FlightOperatorUsers />} />
        <Route path="/admin/pending-operators" element={<AdminPendingOperators />} />
        <Route path="/operator/edit-flight/:flightId" element={<EditFlight />} />

      </Routes>
    </Router>
  );
}

export default App;
