import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/UserProfile.css";
import UserHeader from "./UserHeader";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("authToken");

      try {
        const response = await fetch(
          `http://localhost:7117/pg_api/user/getbyemail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            redirect: "manual",
          }
        );

        if (response.status === 302) {
          console.error(
            "Session expired or unauthorized. Redirecting to login."
          );
          navigate("/login");
        } else if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateClick = () => {
    navigate(`/updateuser`, { state: { user } });
  };

  const handleChangePasswordClick = () => {
    navigate(`/changepassword/${user.email}`);
  };

  return (
    <>
      <UserHeader />
      <div>
        All pg
        <br />
        pg
        <br />
        pg
      </div>
      <div className="user-profile-container">
        <h1>User Profile</h1>
        <div className="user-profile-view">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile No:</strong> {user.mobileNo}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <button onClick={handleUpdateClick}>Update Profile</button>
          <button onClick={handleChangePasswordClick}>Change Password</button>
        </div>
      </div>
    </>
  );
}
