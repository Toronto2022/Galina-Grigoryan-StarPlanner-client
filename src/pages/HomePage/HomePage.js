import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="main">
      <section className="homepage">
        <h1 className="homepage__title">
          "In the realm of StarPlanner, there is no such thing as luck, only
          well-planned victories."
        </h1>
        <Link to="/signup" className="homepage__signup">
          SignUp
        </Link>
        <Link to="/login" className="homepage__login">
          Login
        </Link>
      </section>
    </main>
  );
}
