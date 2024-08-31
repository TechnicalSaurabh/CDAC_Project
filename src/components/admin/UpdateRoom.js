import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/UpdateRoom.css'; // Create and import a CSS file for styling
import AdminHeader from './AdminHeader';

export default function UpdateRoom() {
  const location = useLocation();
  const { room } = location.state;
  const [updatedRoom, setUpdatedRoom] = useState(room);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      console.log(room);
      
      const response = await fetch(`http://localhost:7117/pg_api/room/updateRoom/${updatedRoom.roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updatedRoom),
      });

      if (response.ok) {
        alert('Room updated successfully');
        navigate('/admin/rooms');
      } else {
        alert('Failed to update room');
      }
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Error updating room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AdminHeader/>
    <div className="update-room-container">
      <h2>Update Room</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <div className="form-group">
          <label>Room Number:</label>
          <input
            type="text"
            value={updatedRoom.roomNumber}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, roomNumber: e.target.value })}
            placeholder="Enter room number"
            required
          />
        </div>
        <div className="form-group">
          <label>Area (sq ft):</label>
          <input
            type="number"
            value={updatedRoom.area}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, area: e.target.value })}
            placeholder="Enter area in square feet"
            required
          />
        </div>
        <div className="form-group">
          <label>Capacity:</label>
          <input
            type="number"
            value={updatedRoom.capacity}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, capacity: e.target.value })}
            placeholder="Enter room capacity"
            required
          />
        </div>
        <div className="form-group">
          <label>Floor Number:</label>
          <input
            type="number"
            value={updatedRoom.floorNumber}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, floorNumber: e.target.value })}
            placeholder="Enter floor number"
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            value={updatedRoom.type}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, type: e.target.value })}
            placeholder="Enter room type"
            required
          />
        </div>
        <div className="form-group">
          <label>Rent (₹):</label>
          <input
            type="number"
            value={updatedRoom.rent}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, rent: e.target.value })}
            placeholder="Enter rent amount"
            required
          />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <select
            value={updatedRoom.isAvailable}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, isAvailable: e.target.value === 'true' })}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="update-button">
          {loading ? 'Updating...' : 'Update Room'}
        </button>
      </form>
    </div>
    </>
  );
}
