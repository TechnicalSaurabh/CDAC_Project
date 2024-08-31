import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/RoomManage.css'
import AdminHeader from './AdminHeader';

export default function RoomManage() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:7117/pg_api/room/getAllRoomByUserId', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },   
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
        setMessage('No rooms found or the response is not in the expected format.');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setMessage('Error fetching rooms');
    }
  };

  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:7117/pg_api/room/delete/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setMessage('Room deleted successfully');
        fetchRooms(); // Refresh room list
      } else {
        setMessage('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      setMessage('Error deleting room');
    }
  };

  const handleUpdate = (room) => {
    navigate('/updateRoom', { state: { room } }); // Navigate to the update room component
  };

  return (
    <>
    <AdminHeader/>
    <div className="room-manage">
      <h1>Manage Rooms</h1>
      {message && <p>{message}</p>}
      <table className="room-table">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Number</th>
            <th>Area</th>
            <th>Capacity</th>
            <th>Floor Number</th>
            <th>Type</th>
            <th>Rent</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomId}</td>
              <td>{room.roomNumber}</td>
              <td>{room.area}</td>
              <td>{room.capacity}</td>
              <td>{room.floorNumber}</td>
              <td>{room.type}</td>
              <td>{room.rent}</td>
              <td>{room.available ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleUpdate(room)}>Update</button>
                <button
                  onClick={() => handleDelete(room.roomId)}
                  disabled={!room.available}
                  style={{ backgroundColor: !room.available ? 'grey' : 'red', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
