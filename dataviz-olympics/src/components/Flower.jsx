import React, { useState, useEffect } from "react";
import "../styles/flower.css";
import bee from "../assets/images/bee.svg";
import path from "../assets/images/Path 247.svg";

const Flower = () => {
  const [flowerData, setFlowerData] = useState([]);

  // Fetch data from JSON on component mount
  useEffect(() => {
    fetch("/assets/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Convert the data object into an array of year-value pairs
        const formattedData = Object.entries(data).map(([year, value]) => ({
          year,
          percentage: parseFloat(value),
        }));
        setFlowerData(formattedData); // Store data in state
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []); // Empty dependency array to run only once on mount

  const renderFlowers = () => {
    let flowerGroups = [];
    let currentGroup = [];
    let flowerCount = 0;

    // Loop over the flower data
    flowerData.forEach(({ year, percentage }) => {
      // Calculate number of petals for the flower
      const numPetals = Math.round((percentage / 100) * 100);

      // Create the stem with SVG
      const svgStem = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="68.679"
          height="474.263"
          viewBox="0 0 68.679 474.263"
        >
          <path
            id="Path_247"
            data-name="Path 247"
            d="M2135.747,2158.8s85.359,368.552,64.266,474.052"
            transform="translate(-2135.26 -2158.684)"
            fill="none"
            stroke="#417253"
            strokeWidth="1"
          />
        </svg>
      );

      // Create a flower object (will be rendered)
      const flower = (
        <div key={year} className="flower">
          <div className="flower-center">
            <div className="petal-container" id={`petal-container-${year}`}>
              <div className="flower-center extra-center"></div>
              {Array.from({ length: numPetals }).map((_, index) => (
                <div
                  key={index}
                  className="petal"
                  style={{
                    transform: `rotate(${
                      (index * 360) / 100
                    }deg) translateY(-10px)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          {/* Insert the SVG stem directly into the flower */}
          <div className="stem">{svgStem}</div>
        </div>
      );

      // Add the flower to the current group
      currentGroup.push(flower);
      flowerCount++;

      // After every 10 flowers, push the current group to flowerGroups and reset currentGroup
      if (flowerCount % 10 === 0) {
        flowerGroups.push(
          <div className="flower-group" key={`group-${flowerCount}`}>
            {currentGroup}
          </div>
        );
        currentGroup = []; // Reset the current group
      }
    });

    // If there are any remaining flowers less than 10, create a group for them
    if (currentGroup.length > 0) {
      flowerGroups.push(
        <div className="flower-group" key={`group-${flowerCount}`}>
          {currentGroup}
        </div>
      );
    }

    return flowerGroups;
  };

  return (
    <div className="flower-wrapper">
      <div className="flower-container">{renderFlowers()}</div>
      <div className="flower-stem">
        <img className="bee" src={bee} alt="bee" />
        <img className="path" src={path} alt="path" />
      </div>
    </div>
  );
};

export default Flower;
