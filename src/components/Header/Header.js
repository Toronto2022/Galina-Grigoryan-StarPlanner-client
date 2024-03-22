import React from "react";
import "./Header.scss";
import logo from "../../assets/logo/starplanner_logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);

    navigate("/");
  };
  return (
    <div className="header-main">
      <Link to="/">
        <img className="header-main__logo" src={logo} alt="logo"></img>
      </Link>
      {isLoggedIn && (
        <button className="header-main__btn" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </div>
  );
}
