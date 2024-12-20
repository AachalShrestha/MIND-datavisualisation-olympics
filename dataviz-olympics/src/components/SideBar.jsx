import React from "react";
import "../styles/SideBar.css";
import arrow from "../assets/images/arrow.png";
import petal from "../assets/images/petal.png";
import bee from "../assets/images/bee.svg";
import continent from "../assets/images/continents/Asia.png";
import flower from "../assets/images/flower-africa.png";

const SideNav = ({ isOpen, setIsOpen }) => {
  // Toggle sidebar visibility
  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className="sidenav-wrapper">
      {/* Sidebar controlled by isOpen prop */}
      <div
        className="sidenav"
        style={{
          right: isOpen ? "0" : "-250px", // Slide in and out with the `right` property
        }}
      >
        <a href="#" className="closebtn" onClick={toggleNav}>
          &times;
        </a>

        <div>
          <img src={petal} alt="petal" />
          <p>Each petal represents 1% of women</p>
        </div>

        <div>
          <img src={bee} alt="bee" />
          <p>The bees show the way of time</p>
        </div>

        <div>
          <img src={continent} alt="asia" />
          <p>Click on a flower to filter by continent</p>
        </div>

        <div>
          <img src={flower} alt="flower-africa" />
          <p>Click on a flower to find out the distribution of medals</p>
        </div>
      </div>
      {/* Button to open sidebar */}
      <span className="sidenav-title" onClick={toggleNav}>
        <p>How to read</p>
        <img src={arrow} alt="arrow" />
      </span>
    </div>
  );
};

export default SideNav;
