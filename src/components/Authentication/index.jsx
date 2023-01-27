import React from "react";
import { useState } from "react";
import "./auth.css";
import decodeToken from "jwt-decode";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const Index = ({ setUser, setIsLogged }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getLogin = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", credentials)
      .then(async (resp) => {
        if (resp.status === 200) {
          const token = resp.data.message;
          localStorage.setItem("AUTH_TOKEN", token);
          var decoded = decodeToken(token);
          setUser(decoded);
          setIsLogged(true);
          navigate("/home", { replace: "true" });
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div id="container">
      <div id="introductionBox"></div>
      <div id="loginBox">
        <form action="" method="post" id="formBox" onSubmit={getLogin}>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <p id="emailErrorMessage" className="errorMessage"></p>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <p id="passwordErrorMessage" className="errorMessage"></p>
          <button id="loginBtn">Login</button>
          <p>
            Not our user ?
            <Link to={"/register"} className="linkClass">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;
