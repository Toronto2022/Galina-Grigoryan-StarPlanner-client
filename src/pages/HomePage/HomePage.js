import React from "react";
import { Link } from "react-router-dom";
import useRandomImage from "../../components/UseRandomImage/useRandomImage";
import "./HomePage.scss";

export default function HomePage() {
  const backgroundImageUrl = useRandomImage();
  const backgroundStyle = backgroundImageUrl
    ? { backgroundImage: `url(${backgroundImageUrl})` }
    : {};

  return (
    <main className="main" style={backgroundStyle}>
      <section className="homepage">
        <div className="homepage__box">
          <Link to="/signup" className="homepage__signup">
            SignUp
          </Link>
          <Link to="/login" className="homepage__login">
            Login
          </Link>
        </div>
        <h1 className="homepage__title">
          "In the realm of StarPlanner, there is no such thing as luck, only
          well-planned victories."
        </h1>
      </section>
    </main>
  );
}
