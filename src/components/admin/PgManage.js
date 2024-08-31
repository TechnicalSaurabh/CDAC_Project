import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PgManage.css';
import AdminHeader from './AdminHeader';

export default function PgManage() {
  const [pgs, setPgs] = useState([]); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPgs();
  }, []);

  const fetchPgs = async () => {
    try {
      const response = await fetch('http://localhost:7117/pg_api/pg/getAllPg', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setPgs(data);
      } else {
        setPgs([]);
        setMessage('No PGs found or the response is not in the expected format.');
      }
    } catch (error) {
      console.error('Error fetching PGs:', error);
      setMessage('Error fetching PGs');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7117/pg_api/pg/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setMessage('PG deleted successfully');
        fetchPgs();
      } else {
        setMessage('Failed to delete PG');
      }
    } catch (error) {
      console.error('Error deleting PG:', error);
      setMessage('Error deleting PG');
    }
  };

  const handleRegisterClick = () => {
    navigate('/registerPg');
  };

  const handleUpdateClick = (pg) => {
    navigate('/updatePg', { state: { pg } });
  };

  const handleAddRoomClick = (pgId) => {
    navigate('/registerRoom', { state: { pgId } });
  };

  return (
    <>
    <AdminHeader/>
    <div className="pg-manage">
      <h1>Manage PGs</h1>
      {message && <p>{message}</p>}
      <button className='register-button' onClick={handleRegisterClick}>Register New PG</button>
      
      <table className="pg-table">
        <thead>
          <tr>
            <th>PG ID</th>
            <th>PG Name</th>
            <th>Contact No</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pgs.map((pg) => (
            <tr key={pg.pgId}>
              <td>{pg.pgId}</td>
              <td>{pg.pgName}</td>
              <td>{pg.contactNo}</td>
              <td>{pg.address}</td>
              <td>
                <button onClick={() => handleUpdateClick(pg)}>Update</button>
                <button
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={() => handleDelete(pg.pgId)}
                >
                  Delete
                </button>
                <button
                  style={{ backgroundColor: 'blue', color: 'white' }}
                  onClick={() => handleAddRoomClick(pg.pgId)}
                >
                  Add Room
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
