import React from "react";
import "../styles/Continents.css";

// Array of continent image imports
const continentImages = [
  { src: require("../assets/images/continents/Aall.png"), alt: "All" },
  { src: require("../assets/images/continents/Africa.png"), alt: "Africa" },
  { src: require("../assets/images/continents/Asia.png"), alt: "Asia" },
  { src: require("../assets/images/continents/Europe.png"), alt: "Europe" },
  {
    src: require("../assets/images/continents/North-America.png"),
    alt: "North America",
  },
  { src: require("../assets/images/continents/Oceania.png"), alt: "Oceania" },
  {
    src: require("../assets/images/continents/South-America.png"),
    alt: "South America",
  },
];

function Continents() {
  return (
    <div className="continents-wrapper">
      {continentImages.map((image, index) => (
        <div key={index} className="continent-item">
          <img src={image.src} alt={image.alt} />
          <p>{image.alt}</p>
        </div>
      ))}
    </div>
  );
}

export default Continents;
