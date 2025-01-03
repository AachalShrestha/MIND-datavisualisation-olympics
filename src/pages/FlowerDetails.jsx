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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredData, setHoveredData] = useState(null);

  ///////// HANDLING MOUSE AND HOVER /////////
  const handleFlowerHover = (category, percentage) => {
    console.log("should be hovering", category, percentage);
    if (category && percentage != null) {
      console.log("isnotnul");
      setHoveredCategory(category);
      setHoveredData({ category, percentage }); // Store both properties
      console.log(`Hovered Category: ${category}, Percentage: ${percentage}`);
    } else {
      setHoveredCategory(null);
      setHoveredData(null); // Reset when no hover
    }
  };
  let previousX = 3;

  ///////// FLOWER POSITIONS
  // Define excluded areas (as percentage values)
  const excludedAreas = [
    { x: 40, y: 32, width: 20, height: 35 }, // Middle area to avoid
    { x: 70, y: 0, width: 30, height: 47 }, // Top-right area to avoid
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
      left = previousX + 1; // Random left position between 3% and 95%
      top = Math.random() * (95 - 30) + 30; // Random top position between 3% and 95%
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
        const percentage = parseFloat(flowerData[category]); // Ensure this is a valid number
        if (!isNaN(percentage)) {
          const count = Math.round((percentage / 100) * totalFlowers);
          for (let i = 0; i < count; i++) {
            const { left, top } = generateRandomPosition(); // Get random position
            flowersArray.push({
              category,
              percentage,
              left,
              top,
            });
            previousX += 0.95;
          }
        }
      });

      setFlowers(flowersArray); // Update the state with generated flowers
    }
  }, [flowerData]);

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

  // HANDLE MOUSE MOVE

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  //BIG FLOWER IN MIDDLE
  const bigFlower = flowerData &&
    flowerData.percentage &&
    !isNaN(parseFloat(flowerData.percentage)) && (
      <div key={year} className="big-flower big-flower-wrapper">
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
        <div className="flower-field" onMouseMove={handleMouseMove}>
          {flowers.map((flower, index) => (
            <FlowerDetailsFlower
              key={index}
              category={flower.category}
              percentage={flower.percentage}
              style={{
                "--flower-left": `${flower.left}%`,
                "--flower-top": `${flower.top}%`,
              }}
              onHover={handleFlowerHover} // Pass the callback here
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
              isMenuFlower={true}
            />
            <p>% of golden medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <FlowerDetailsFlower
              key={1}
              category="silver"
              style={{ position: "relative" }}
              isMenuFlower={true}
            />
            <p>% of silver medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <FlowerDetailsFlower
              key={1}
              category="bronze"
              style={{ position: "relative" }}
              isMenuFlower={true}
            />
            <p>% of bronze medals</p>
          </div>
          <div className="flower-detail-legend-property">
            <FlowerDetailsFlower
              key={1}
              category="no-medal"
              style={{ position: "relative" }}
              isMenuFlower={true}
            />
            <p>% of no medals</p>
          </div>
        </div>
      </div>

      {/* HOVER DIV  */}
      {hoveredData && (
        <div
          className="hovered-div active"
          style={{
            position: "absolute",
            top: mousePosition.y - 40 + "px", // Adjusted offset for top
            left: mousePosition.x + 30 + "px", // Adjusted offset for left
            pointerEvents: "none",
          }}
        >
          <div className="hovered-content">
            <p>{hoveredData.category}</p> {/* Use hoveredData.category */}
            <p>{hoveredData.percentage}%</p> {/* Use hoveredData.percentage */}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlowerDetails;
