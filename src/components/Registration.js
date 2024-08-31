import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Registration.css'; // Import your CSS file for custom styles
import Header from './Header';

const Registration = () => {
  const [name, setName] = useState('');
  const [address,setAddress] = useState('');
  const [mobileNo, setMobileNumber]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log(name,email, mobileNo ,address, password, role);
    axios.post('http://localhost:7117/auth/register', 
      { name,email, mobileNo ,address, password, role })
      .then(result => {
        console.log(result);
        alert('Registration successful');
        navigate('/login');
      })
      .catch(error => {
        console.error('Registration failed:', error);
        alert('Registration failed');
      });
  };

  return (
    <>
    <Header/>
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={e => { e.preventDefault(); handleRegister(); }}>
      <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
       
        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            value={mobileNo}
            onChange={e => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  );
};

export default Registration;
