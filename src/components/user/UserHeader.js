import React from "react";
import "../../css/UserHeader.css";
import { useNavigate } from "react-router-dom";

export default function UserHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Remove the JWT token from session storage
    navigate("/"); // Redirect to the homepage
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/userhome">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/showbooking">
              Show Booking
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/bill">
              Bill
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#g">
              Payments
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/support">
              Support
            </a>
          </li>
          <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
        </ul>
      </div>
    </nav>
  );
}
