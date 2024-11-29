import React from "react";
import "../styles/FlowerDetail.css";

function FlowerDetails() {
  return (
    <div className="flower-details">
      <div className="flower">
        {/* Flower center */}
        <div className="detail-flower-center">
          {/* Petals */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="detail-flower-petal"
              style={{
                transform: `rotate(${45 + index * 90}deg) translateY(-7px)`,
              }}
            ></div>
          ))}
          <div className="detail-flower-center-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default FlowerDetails;
