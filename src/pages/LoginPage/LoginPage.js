import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/auth/login`;

export default function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      sessionStorage.setItem("token", response.data.access_token);
      navigate("/calendar");

      setIsLoggedIn(true);
      setIsLoginError(false);
      setErrorMessage("");
    } catch (error) {
      setIsLoginError(true);
    }
  };
  const renderLogin = () => (
    <div>
      <h1>Login</h1>
      {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
  // if (!isLoggedIn) {
  return renderLogin();

  // return <div>LoginPage</div>;
}
