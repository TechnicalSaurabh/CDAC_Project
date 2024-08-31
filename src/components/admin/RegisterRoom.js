import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/RegisterRoom.css'; // Import CSS for styling

export default function RegisterRoom() {
  const [room, setRoom] = useState({
    roomNumber: '',
    area: '',
    capacity: '',
    floorNumber: '',
    type: '',
    rent: '',
    isAvailable: true
  });
  const [images, setImages] = useState([]); // State to hold multiple image files
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { pgId } = location.state;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom({
      ...room,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Update images state with all selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, create the room data
      const roomResponse = await fetch(`http://localhost:7117/pg_api/room/register/${pgId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        body: JSON.stringify(room),
      });
  
      if (!roomResponse.ok) {
        setError('Failed to add room. Please try again.');
        return;
      }
  
      // Getting the room ID from the response
      const roomData = await roomResponse.json();
      const roomId = roomData.roomId; 
  
      if (!roomId) {
        throw new Error('Room ID not returned from server.');
      }
  
      console.log('Room ID:', roomId);
  
      if (images.length > 0) {
        for (const image of images) {
          const formData = new FormData();
          formData.append('image', image);
  
          try {
            const imageResponse = await fetch(`http://localhost:7117/pg_api/image/upload/${roomId}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
              },
              body: formData
            });
  
            if (!imageResponse.ok) {
              throw new Error(`Failed to upload image: ${image.name}`);
            }
          } catch (error) {
            console.error('Image upload error:', error);
            setError('Failed to upload one or more images. Please try again.');
            return; // Exit the function if an error occurs
          }
        }
      }
  
      navigate('/admin/pgmanage');
    } catch (error) {
      console.error('Error adding room:', error);
      setError('Error adding room. Please try again later.');
    }
  };
  
  return (
    <div className="register-room">
      <h1>Register Room</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            placeholder="Enter room number"
            value={room.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input
            type="number"
            id="area"
            name="area"
            placeholder="Enter area of room in sqft"
            value={room.area}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="Number of persons Allowded in room"
            value={room.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="floorNumber">Floor Number:</label>
          <input
            type="number"
            id="floorNumber"
            name="floorNumber"
            placeholder="Enter floor number"
            value={room.floorNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter room type"
            value={room.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rent">Rent:</label>
          <input
            type="number"
            id="rent"
            name="rent"
            placeholder="Enter rent amount per month"
            value={room.rent}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="isAvailable">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={room.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>
        </div> */}
        <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">Add Room</button>
      </form>
    </div>
  );
}
