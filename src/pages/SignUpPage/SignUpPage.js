import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080";
const signupUrl = `${baseUrl}/auth/signup`;

export default function SignUpPage() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <div>
      <h1>Sign Up</h1>
      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "10px" }}
        >
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Name: <input type="text" name="name" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <div className="form-group">
          Email: <input type="email" name="email" />
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
