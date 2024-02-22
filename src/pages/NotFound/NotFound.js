import React from "react";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="notFound">
      <h1 className="notFound__title">404 - Not Found!</h1>
      <p className="notFound__text">
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
}
