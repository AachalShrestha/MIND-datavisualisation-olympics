import React from "react";
import Flower from "../components/Flower";
import "../styles/Home.css";
import "../styles/index.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="header-title">
          <h1>Women in Olympics</h1>
          <p>
            This is a data visualization exploring the evolution of women's
            participation in the Olympics, highlighting how their involvement
            has increased across different continents and sports over the years.
          </p>
        </div>
      </div>
      <Flower />
    </div>
  );
}

export default App;
