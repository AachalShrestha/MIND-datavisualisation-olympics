import React, { useState } from "react";
import Flower from "../components/Flower";
import Continents from "../components/Continents";
import SideBar from "../components/SideBar";
import "../styles/Home.css";
import "../styles/index.css";

function App() {
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [isOpen, setIsOpen] = useState(false); // Move `isOpen` state here

  return (
    <div>
      {/* Overlay controlled by isOpen */}
      <div
        className="overlay"
        style={{
          backgroundColor: isOpen ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
          display: isOpen ? "block" : "none",
        }}
        onClick={() => setIsOpen(false)} // Clicking on overlay closes the sidebar
      ></div>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-title">
            <h1>Women in Olympics</h1>
            <p>
              This is a data visualization exploring the evolution of women's
              participation in the Olympics, highlighting how their involvement
              has increased across different continents and sports over the
              years.
            </p>
          </div>
          <div className="continents-sidebar-container">
            {/* Pass isOpen and setIsOpen to SideBar */}
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <Continents onContinentClick={setSelectedContinent} />
          </div>
        </div>
        <Flower selectedContinent={selectedContinent} />
      </div>
    </div>
  );
}

export default App;
