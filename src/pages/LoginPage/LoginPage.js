import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import useRandomImage from "../../components/UseRandomImage/useRandomImage";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/auth/login`;

export default function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const backgroundImageUrl = useRandomImage();
  const backgroundStyle = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

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
    <div className="login" style={backgroundStyle}>
      <h1 className="login__title">Login</h1>
      {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
      <form onSubmit={handleLogin} className="login__form">
        <div className="form-group">
          Username:
          <input
            className="login__input"
            type="text"
            name="username"
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          Password:
          <input
            className="login__input"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
  return renderLogin();
}
