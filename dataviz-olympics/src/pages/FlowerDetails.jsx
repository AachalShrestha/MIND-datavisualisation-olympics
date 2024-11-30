import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlowerDetailsFlower from "../components/FlowerDetailFlower"; // Import the flower component
import "../styles/FlowerDetail.css";

function FlowerDetails() {
  const { continent, year } = useParams();
  const [flowerData, setFlowerData] = useState(null); // Store percentages for the year
  const [flowers, setFlowers] = useState([]); // Store flower positions and categories
  let previousX = 0;

  // Define excluded areas (as percentage values)
  const excludedAreas = [
    { x: 30, y: 30, width: 40, height: 40 }, // Middle area to avoid
    { x: 70, y: 0, width: 30, height: 30 }, // Top-right area to avoid
  ];

  // Function to check if the position is inside any excluded area
  const isInsideExcludedArea = (left, top) => {
    for (let area of excludedAreas) {
      if (
        left >= area.x &&
        left <= area.x + area.width &&
        top >= area.y &&
        top <= area.y + area.height
      ) {
        return true; // Inside an excluded area
      }
    }
    return false; // Outside all excluded areas
  };

  // Function to generate random position
  const generateRandomPosition = () => {
    let left, top;
    do {
      left = previousX + 3; // Random left position between 3% and 95%
      top = Math.random() * (95 - 20) + 20; // Random top position between 3% and 95%
    } while (isInsideExcludedArea(left, top)); // Regenerate if inside excluded area

    return { left, top };
  };

  useEffect(() => {
    fetch(`/assets/data/${continent}.json`)
      .then((resp) => resp.json())
      .then((data) => {
        // Extract data for the specific year
        const yearData = data[year];
        console.log(year);
        if (yearData) {
          setFlowerData(yearData); // Store the year object
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [continent, year]);

  console.log(flowerData);

  useEffect(() => {
    if (flowerData) {
      const totalFlowers = 100; // Fixed total number of flowers
      const flowersArray = [];
      const categories = ["gold", "silver", "bronze", "no-medal"];

      categories.forEach((category) => {
        const count = Math.round(
          (parseFloat(flowerData[category]) / 100) * totalFlowers
        );
        console.log("count", count);
        for (let i = 0; i < count; i++) {
          const { left, top } = generateRandomPosition(); // Get random position
          flowersArray.push({
            category,
            left,
            top,
          });

          previousX += 0.95;
        }
      });

      setFlowers(flowersArray);
    }
  }, [flowerData]);

  console.log("flowerdata", flowerData);

  return (
    <div className="flower-detail-wrapper">
      {flowers.length > 0 && (
        <div className="flower-field">
          {flowers.map((flower, index) => (
            <FlowerDetailsFlower
              category={flower.category}
              style={{
                left: `${flower.left}%`,
                top: `${flower.top}%`,
              }}
            />
          ))}
        </div>
      )}
      {/* BIG FLOWER IN MIDDLE */}

      <div className="flower-detail-legend">
        <h3>How to read</h3>
        <div className="flower-detail-legend-properties">
          <div className="flower-detail-legend-property">
            <p>% of golden medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <p>% of silver medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <p>% of bronze medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <p>% of no medals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowerDetails;
