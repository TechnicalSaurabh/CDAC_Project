import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookingDetails() {
  const [bookingDate, setBookingDate] = useState('');
  const navigate = useNavigate();
  const { roomId } = useParams();
  const today = new Date().toISOString().split('T')[0];

  const handleBookingSubmit = () => {
    const token = sessionStorage.getItem("authToken");
    axios.post(`http://localhost:7117/pg_api/booking/book/${roomId}`, {
      bookingDate: bookingDate,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        navigate('/showbooking');
      }
    })
    .catch(error => {
      console.error("There was an error booking the room!", error);
    });
  };

 
  return (
    <div className="container">
      <h2>Booking Details</h2>
      <div className="form-group">
        <label htmlFor="bookingDate">Select Booking Date:</label>
        <input
          type="date"
          id="bookingDate"
          className="form-control"
          value={bookingDate}
          min={today}
          onChange={(e) => setBookingDate(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleBookingSubmit}>Book Now</button>
    </div>
  );
}
