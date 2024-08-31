import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/AdminHeader.css'; // Ensure to style it according to your requirements

export default function AdminHeader() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Remove the JWT token from session storage
    navigate("/"); // Redirect to the homepage
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <button className="menu-button" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      <nav className={`admin-nav ${isOpen ? 'open' : ''}`}>
        <ul className="admin-nav-list">
        <li className="admin-nav-item">
            <Link to="/adminHome">Home</Link>
          </li>
          <li className="admin-nav-item">
            <Link to="/admin/profile">Manage Profile</Link>
          </li>
          <li className="admin-nav-item">
            <Link to="/admin/pgmanage">Manage PG</Link>
          </li>
          <li className="admin-nav-item">
            <Link to="/admin/rooms">Manage Rooms</Link>
          </li>
          <li className="admin-nav-item">
            <Link to="/admin/bookings">Manage Bookings</Link>
          </li>
          <li className="admin-nav-item">
            <Link to="/admin/bills">Manage Bills</Link>
          </li>
  
          
          
          <li className="admin-nav-item">
            <button className="nav-link btn btn-link btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
