import React from "react";
import { useLocation } from "react-router-dom";
import ToDo from "../../components/ToDo/ToDo";
import "./TaskPage.scss";
import useRandomImage from "../../components/UseRandomImage/useRandomImage";

export default function TaskPage() {
  const location = useLocation();
  const { date } = location.state || {};
  const backgroundImageUrl = useRandomImage();

  const backgroundStyle = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

  return (
    <div className="taskpage" style={backgroundStyle}>
      <h1 className="taskpage__title">
        Tasks for {date ? new Date(date).toDateString() : "Select a Date"}
      </h1>
      <ToDo />
    </div>
  );
}
