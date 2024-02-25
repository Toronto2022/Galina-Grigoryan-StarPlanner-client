import React from "react";
import { useLocation } from "react-router-dom";
import ToDo from "../../components/ToDo/ToDo";

export default function TaskPage() {
  const location = useLocation();
  const { date } = location.state || {}; // Assuming you're passing date as state

  return (
    <div>
      <h1>
        Tasks for {date ? new Date(date).toDateString() : "Select a Date"}
      </h1>
      <ToDo />
    </div>
  );
}
