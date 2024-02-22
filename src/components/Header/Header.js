import React from "react";
import "./Header.scss";
import logo from "../../assets/logo/starplanner_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo"></img>
      </Link>
      {/* <nav className="header__menu">
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </nav> */}
    </div>
  );
}
