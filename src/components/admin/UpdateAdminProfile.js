import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/UserProfile.css';
import AdminHeader from './AdminHeader';

export default function UpdateadminProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user; // Get user data passed via state

  const [user, setUser] = useState({
    userId: '',
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      console.error('No user data available');
      navigate('/admin/profile'); // Redirect to profile page if no user data
    }
  }, [userData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:7117/pg_api/user/updateUser', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('User updated successfully');
        navigate(''); // Redirect to profile page after update
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
    <AdminHeader/>
    <div className="user-profile-container">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={user.mobileNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>    
        <button type="submit">Save Changes</button>
      </form>
    </div>
    </>
  );
}
