import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';  // ✅ Reuse your Admin UserList styling

function FlightOperatorUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/users/operator/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
        alert('Failed to load users. Please login as Flight Operator.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-page">
      <h2>Users Who Booked My Flights</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightOperatorUsers;
