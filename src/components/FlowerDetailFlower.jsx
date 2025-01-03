import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/FlowerDetail.css";
function FlowerDetailsFlower({
  category,
  style,
  year,
  percentage,
  onHover,
  isMenuFlower,
}) {
  ///////// HANDLING MOUSE AND HOVER /////////

  if (isMenuFlower) {
    return (
      <div className="flower-details" style={style}>
        <div className="flower">
          <div className="detail-flower-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`detail-flower-petal ${category}`}
                style={{
                  transform: `rotate(${45 + index * 90}deg) translateY(-3px)`,
                }}
              ></div>
            ))}
            <div className="detail-flower-center-inner"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flower-details" style={style}>
        <div
          className="flower"
          onMouseEnter={() => onHover(category, percentage)} // Call the callback with category
          onMouseLeave={() => onHover(null)} // Reset on mouse leave
        >
          <div className="detail-flower-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`detail-flower-petal ${category}`}
                style={{
                  transform: `rotate(${45 + index * 90}deg) translateY(-3px)`,
                }}
              ></div>
            ))}
            <div className="detail-flower-center-inner"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlowerDetailsFlower;
