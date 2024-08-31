import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7171/user/" + id)
      .then((result) => {
        console.log(result.data);
        setName(result.data.name);
        setEmail(result.data.email);
        setPassword(result.data.password);
      })
      .catch((error) => console.log(error));
  }, [id]); // Add id as a dependency to ensure the effect runs when id changes

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:7171/user/" + id, { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/all");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container pt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
