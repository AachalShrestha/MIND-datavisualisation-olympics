import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import FlowerDetailsFlower from "../components/FlowerDetailFlower";
import arrow from "../assets/images/arrow.png";
import "../styles/FlowerDetail.css";
import "../styles/flower.css";

function FlowerDetails() {
  const navigate = useNavigate();
  const { continent, year } = useParams();
  const [flowerData, setFlowerData] = useState(null); // Store percentages for the year
  const [flowers, setFlowers] = useState([]); // Store flower positions and categories
  const [olympicName, setOlympicName] = useState();
  const [percentage, setPercentage] = useState();
  let previousX = 0;

  // Define excluded areas (as percentage values)
  const excludedAreas = [
    { x: 40, y: 30, width: 30, height: 30 }, // Middle area to avoid
    { x: 70, y: 0, width: 30, height: 35 }, // Top-right area to avoid
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
        if (yearData) {
          setFlowerData(yearData); // Store the year object
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [continent, year]);

  useEffect(() => {
    if (flowerData) {
      const totalFlowers = 100; // Fixed total number of flowers
      const flowersArray = [];
      const categories = ["gold", "silver", "bronze", "no-medal"];

      categories.forEach((category) => {
        const count = Math.round(
          (parseFloat(flowerData[category]) / 100) * totalFlowers
        );
        for (let i = 0; i < count; i++) {
          const { left, top } = generateRandomPosition();
          console.log(`Flower ${category} position: left=${left}, top=${top}`); // Debug // Get random position
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
  console.log(flowerData);

  // FETCH OLYMPIC NAME
  useEffect(() => {
    fetch(`/assets/data/names.json`)
      .then((resp) => resp.json())
      .then((data) => {
        // Extract data for the specific year
        const yearName = data[year];
        if (yearName) {
          setOlympicName(yearName); // Store the year object
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  console.log(olympicName);
  //BIG FLOWER IN MIDDLE
  const bigFlower = flowerData &&
    flowerData.percentage &&
    !isNaN(parseFloat(flowerData.percentage)) && (
      <div key={year} className="big-flower">
        <div className="big-flower-center">
          <div className="petal-container" id={year}>
            <div className="flower-center big-flower-extra-center"></div>
            {Array.from({ length: parseInt(flowerData.percentage, 10) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`big-flower-petal petal ${continent}`} // Assuming continent as a class to style petals
                  style={{
                    transform: `rotate(${
                      (index * 360) / 100
                    }deg) translateY(-6px)`,
                  }}
                ></div>
              )
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flower-detail-wrapper">
      {/* TITLE AND BACK BUTTON */}
      <div className="flower-detail-header" onClick={() => navigate("/")}>
        <div className="flower-detail-go-back">
          <img src={arrow} alt="back arrow"></img>
          <p>Back</p>
        </div>
        <h1>{olympicName}</h1>
        <h3>{continent.charAt(0).toUpperCase() + continent.slice(1)}</h3>
      </div>
      {bigFlower}
      {flowers.length > 0 && (
        <div className="flower-field">
          {flowers.map((flower, index) => (
            <FlowerDetailsFlower
              key={index}
              category={flower.category}
              style={{
                "--flower-left": `${flower.left}%`, // Correctly pass the custom property
                "--flower-top": `${flower.top}%`,
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
            <FlowerDetailsFlower
              key={1}
              category="gold"
              style={{ position: "relative" }}
            />
            <p>% of golden medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <FlowerDetailsFlower
              key={1}
              category="silver"
              style={{ position: "relative" }}
            />
            <p>% of silver medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <FlowerDetailsFlower
              key={1}
              category="bronze"
              style={{ position: "relative" }}
            />
            <p>% of bronze medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <FlowerDetailsFlower
              key={1}
              category="no-medal"
              style={{ position: "relative" }}
            />
            <p>% of no medals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowerDetails;
