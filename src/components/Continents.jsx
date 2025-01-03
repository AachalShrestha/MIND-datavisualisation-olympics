import React from "react";
import "../styles/Continents.css";

// Array of continent image imports
const continentImages = [
  {
    src: require("../assets/images/continents/Aall.png"),
    alt: "All",
    name: "all",
  },
  {
    src: require("../assets/images/continents/Africa.png"),
    alt: "Africa",
    name: "africa",
  },
  {
    src: require("../assets/images/continents/Asia.png"),
    alt: "Asia",
    name: "asia",
  },
  {
    src: require("../assets/images/continents/Europe.png"),
    alt: "Europe",
    name: "europe",
  },
  {
    src: require("../assets/images/continents/North-America.png"),
    alt: "North America",
    name: "north-america",
  },
  {
    src: require("../assets/images/continents/Oceania.png"),
    alt: "Oceania",
    name: "oceania",
  },
  {
    src: require("../assets/images/continents/South-America.png"),
    alt: "South America",
    name: "south-america",
  },
];

function Continents({ onContinentClick }) {
  return (
    <div className="continents-wrapper">
      {continentImages.map((image, index) => (
        <div
          key={index}
          className="continent-item"
          onClick={() => onContinentClick(image.name)}
        >
          <img src={image.src} alt={image.alt} id={image.name} />
          <p>{image.alt}</p>
        </div>
      ))}
    </div>
  );
}

export default Continents;
