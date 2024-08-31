import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdatePG() {
  const location = useLocation();
  const navigate = useNavigate();
  const pg = location.state?.pg; // Access pg from location.state

  const [pgName, setPgName] = useState(pg ? pg.pgName : '');
  const [ownerName, setOwnerName] = useState(pg ? pg.ownerName : '');
  const [contactNo, setContactNo] = useState(pg ? pg.contactNo : '');
  const [address, setAddress] = useState(pg ? pg.address : '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (pg) {
      setPgName(pg.pgName);
      setOwnerName(pg.ownerName);
      setContactNo(pg.contactNo);
      setAddress(pg.address);
    }
  }, [pg]);

  const handleUpdate = async () => {
    try {
      const updatedPg = { ...pg, pgName, ownerName, contactNo, address };
      const response = await fetch('http://localhost:7117/pg_api/pg/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updatedPg),
      });

      if (response.ok) {
        setMessage('PG updated successfully');
        navigate('/admin/pgmanage'); // Redirect after successful update
      } else {
        setMessage('Failed to update PG');
      }
    } catch (error) {
      console.error('Error updating PG:', error);
      setMessage('Error updating PG');
    }
  };

  if (!pg) {
    return <p>No PG data available</p>;
  }

  return (
    <div className="pg-form">
      <h1>Update PG</h1>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="PG Name"
        value={pgName}
        onChange={(e) => setPgName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact No"
        value={contactNo}
        onChange={(e) => setContactNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleUpdate}>Update PG</button>
    </div>
  );
}
