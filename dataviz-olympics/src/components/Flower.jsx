import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/flower.css";
import bee from "../assets/images/bee.svg";
import path from "../assets/images/Path 247.svg";

const Flower = ({ selectedContinent = "all" }) => {
  const [flowerData, setFlowerData] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFlowerData, setHoveredFlower] = useState([]);
  const [hoverDivContent, setHoverDivContent] = useState();
  const [animateFlowers, setAnimateFlowers] = useState(false);

  const navigate = useNavigate();
  console.log(selectedContinent);

  /*   useEffect(() => {
    if (selectedContinent) {
      setAnimateFlowers(true);

      // Reset the animation state after it finishes
      setTimeout(() => {
        setAnimateFlowers(false);
      }, 1000); // Match the animation duration
    }
  }, [selectedContinent]);
 */
  // Fetch data from JSON on component mount
  useEffect(() => {
    fetch(`/assets/data/${selectedContinent}.json`)
      .then((response) => response.json())
      .then((data) => {
        // Convert the data object into an array of year-value pairs
        const formattedData = Object.entries(data).map(([year, value]) => ({
          year,
          percentage: parseFloat(value.percentage), // Ensure accessing the percentage correctly
        }));
        setFlowerData(formattedData); // Store data in state
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, [selectedContinent]); // Empty dependency array to run only once on mount

  //
  useEffect(() => {
    if (selectedContinent !== null) {
      console.log(`Selected continent changed to: ${selectedContinent}`);
      // Add your custom logic here
    }
  }, [selectedContinent]); // Dependency array includes selectedContinent

  //WHEN HOVERED ON FLOWER
  useEffect(() => {
    if (isHovered) {
      setHoverDivContent(hoveredFlowerData);
      console.log(hoveredFlowerData);
    }
  });
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const renderFlowers = () => {
    let flowerGroups = [];
    let currentGroup = [];
    let flowerCount = 0;

    // Loop over the flower data
    flowerData.forEach(({ year, percentage }) => {
      let numPetals;
      let isLessThan1;
      // Calculate number of petals for the flower
      console.log("percentage", percentage);
      if (percentage < 1 && percentage !== 0) {
        numPetals = 1;
        isLessThan1 = true;
      } else if (percentage >= 1) {
        numPetals = Math.round((percentage / 100) * 100);
        isLessThan1 = false;
      }

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
        <div
          key={year}
          className="flower"
          onMouseEnter={() => {
            setIsHovered(true);
            setHoveredFlower([year, percentage]);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flower-center"
            onClick={() => navigate(`/${selectedContinent}/${year}`)}
          >
            <div className="petal-container" id={year}>
              <div className="flower-center extra-center"></div>
              {Array.from({ length: numPetals }).map((_, index) => (
                <div
                  key={index}
                  className={`petal ${selectedContinent} ${
                    isLessThan1 ? "less-than-one" : ""
                  } `} // Add animate class conditionally
                  style={{
                    transform: `rotate(${
                      (index * 360) / 100
                    }deg) translateY(-6px)`,
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
    <div className="flower-wrapper" onMouseMove={handleMouseMove}>
      <div className="flower-container">{renderFlowers()}</div>
      <div className="flower-stem">
        <div className="bee-path-wrapper">
          <div className="path-wrapper">
            <img className="path path-one" src={path} alt="path" />
          </div>
          <div className="bee-wrapper">
            <img className="bee bee-one" src={bee} alt="bee" />
          </div>
        </div>
        <div className="bee-path-wrapper">
          <div className="path-wrapper">
            <img className="path path-two" src={path} alt="path" />
          </div>
          <div className="bee-wrapper">
            <img className="bee bee-two" src={bee} alt="bee" />
          </div>
        </div>
        <div className="bee-path-wrapper">
          <div className="path-wrapper">
            <img className="path path-three" src={path} alt="path" />
          </div>
          <div className="bee-wrapper">
            <img className="bee bee-three" src={bee} alt="bee" />
          </div>
        </div>
      </div>

      {/* Hovered div that follows the mouse */}
      {isHovered && (
        <div
          className={`hovered-div ${isHovered ? "active" : ""}`} // Add active class for fade effect
          style={{
            position: "absolute",
            top: mousePosition.y - 40 + "px",
            left: mousePosition.x + 30 + "px",
            pointerEvents: "none",
          }}
        >
          {/* Customize this div as needed */}
          <div className="hovered-content">
            <p>{hoveredFlowerData[0]}</p>
            <p>{hoveredFlowerData[1]}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flower;
