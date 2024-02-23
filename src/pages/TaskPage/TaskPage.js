import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function TaskPage() {
  const location = useLocation();
  const { date } = location.state || {};

  return (
    // <div>
    //   <h1>
    //     Tasks for {date ? new Date(date).toDateString() : "Select a Date"}
    //   </h1>
    // </div>
    <div className="tasks">
      <div className="wrapper">
        <input type="text" placeholder="Enter..." />
        <button className="Enter"></button>
      </div>
    </div>
  );
}
