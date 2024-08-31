import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import'../css/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Enter email and password');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password should be 8 characters and include at least one special character, one alphabet, and one number');
      return;
    }

    axios.post("http://localhost:7117/auth/login", { email, password })
      .then(result => {
        alert('Login successful');
        const token = result.data.jwt;
        sessionStorage.setItem('authToken', token);
        axios.get(`http://localhost:7117/auth/getbyjwt`, { headers: { Authorization: `Bearer ${token}` }})
          .then(userResult => {
            const userRole = userResult.data.role;
            console.log(userRole);
            if (userRole === "admin") {
              navigate('/adminHome');
            } else {
              navigate('/userHome');
            }
          })
          .catch(userError => {
            console.log(userError);
            setError('Failed to fetch user role. Please try again later.');
          });
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.status === 404) {
          setError('Invalid email or password');
        } else {
          setError("you don't have account register");
        }
      });
  }

  return (
    <>
      <Header />
      <>
      </>
      <div className="container1 pt-8">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p>Don't have an account?</p><br/>
        <Link className="nav-link" to="/registration">Register</Link>
      </div>
    </>
  );
}
