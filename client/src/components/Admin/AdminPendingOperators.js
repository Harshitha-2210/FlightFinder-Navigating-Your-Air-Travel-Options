import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPendingOperators.css';

function AdminPendingOperators() {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    const fetchPendingOperators = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/users/pending-operators', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOperators(response.data);
      } catch (error) {
        console.error('Error fetching pending operators:', error);
      }
    };

    fetchPendingOperators();
  }, []);

  const handleApprove = async (operatorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/users/approve/${operatorId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Operator approved!');
      setOperators(operators.filter(op => op._id !== operatorId));
    } catch (error) {
      console.error('Error approving operator:', error);
      alert('Failed to approve operator.');
    }
  };

  return (
    <div className="pending-operators-page">
      <h2>Pending Flight Operator Approvals</h2>
      {operators.length === 0 ? (
        <p>No pending operators.</p>
      ) : (
        operators.map(operator => (
          <div key={operator._id} className="operator-card">
            <p><strong>Name:</strong> {operator.name}</p>
            <p><strong>Email:</strong> {operator.email}</p>
            <button onClick={() => handleApprove(operator._id)}>Approve</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPendingOperators;
