import React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.scss";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useRandomImage from "../../components/UseRandomImage/useRandomImage";

// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [userInfo, setUserInfo] = useState({}, []);
  // const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const navigate = useNavigate();
  const backgroundImageUrl = useRandomImage();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const name = decodedToken.name || "User";
        setUserInfo({ name: name });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in sessionStorage.");
    }

    // const fetchRandomImage = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${REACT_APP_SERVER_URL}/api/random-image`
    //     );

    //     setBackgroundImageUrl(`${REACT_APP_SERVER_URL}${response.data.url}`);
    //   } catch (error) {
    //     console.error("Error fetching random image:", error);
    //   }
    // };

    // fetchRandomImage();
    // }, []);
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
    navigate("/taskpage", { state: { date: newDate } });
  };
  const backgroundStyle = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

  return (
    <main className="main-background" style={backgroundStyle}>
      <h1>Welcome, {userInfo.name}</h1>
      <Calendar onChange={onChange} value={date} />
    </main>
  );
}
