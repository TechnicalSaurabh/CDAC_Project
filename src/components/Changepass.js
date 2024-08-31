import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UserProfile.css';

export default function ChangePass() {
  const { email } = useParams(); // Extract email from path variable
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    if (name === 'newPassword') setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:7117/pg_api/user/updatepassword', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      if (response.ok) {
        alert('Password changed successfully');
        navigate('/profile'); // Redirect to profile page after change
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
