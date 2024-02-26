import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRandomImage from "../../components/UseRandomImage/useRandomImage";
import "./SignUpPage.scss";

const baseUrl = "http://localhost:8080";
const signupUrl = `${baseUrl}/auth/signup`;

export default function SignUpPage() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const backgroundImageUrl = useRandomImage();
  const backgroundStyle = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await axios.post(signupUrl, {
        username: e.target.username.value,
        name: e.target.name.value,
        password: e.target.password.value,
        email: e.target.email.value,
      });
      setIsSignedUp(true);
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "It seems this email is already registered. Please try again."
        );
      }
    }
  };
  const renderSignUp = () => (
    <div className="signup" style={backgroundStyle}>
      <h1 className="signup__title">Sign Up</h1>
      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "10px" }}
        >
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSignup} className="signup__form">
        <div className="form-group">
          Username:
          <input
            className="signup__input"
            type="text"
            name="username"
            placeholder="Enter Usename"
          />
        </div>
        <div className="form-group">
          Name:
          <input
            className="signup__input"
            type="text"
            name="name"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          Password:
          <input
            className="signup__input"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          Email:
          <input
            className="signup__input"
            type="email"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
  if (!isSignedUp) {
    return renderSignUp();
  }
}
