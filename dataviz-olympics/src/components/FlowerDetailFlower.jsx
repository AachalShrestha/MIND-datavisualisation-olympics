import React from "react";
import { useParams } from "react-router-dom";
import "../styles/FlowerDetail.css";

function FlowerDetailsFlower({ category, style }) {
  console.log(category, style);
  return (
    <div
      className="flower-details"
      style={{ top: `${style.top}`, left: `${style.left}` }}
    >
      <div className="flower">
        {/* Flower center */}
        <div className="detail-flower-center">
          {/* Petals */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
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

export default FlowerDetailsFlower;
