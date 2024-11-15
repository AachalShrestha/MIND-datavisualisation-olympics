import "../styles/flower.css";
import flower from "../assets/images/flower-stem.png";
import bee from "../assets/images/bee.svg";

const Flower = () => {
  return (
    <div className="flower-wrapper">
      <div className="flower-container">
        <div className="flower-head">
          <img className="flower" src={flower} alt="flower" />
        </div>
      </div>
      <div className="flower-stem">
        <img className="bee" src={bee} alt="bee" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1061.037"
          height="127.687"
          viewBox="0 0 1061.037 127.687"
        >
          <defs>
            <style>
              {`
                .cls-1 {
                  fill: none;
                  stroke: #707070;
                  stroke-dasharray: 5;
                  stroke-width: 2;
                }
              `}
            </style>
          </defs>
          <path
            className="cls-1"
            d="M2115.041,2033.338s968.178-117.146,825.684,26.323"
          />
        </svg>
      </div>
    </div>
  );
};

export default Flower;
