import React from "react";

const Loader = (props) => {
  const width = props.width ? props.width : 100;
  const height = props.height ? props.height : 100;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width={width}
      height={height}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke={props.color ? props.color : "#ffb37c"}
        strokeDasharray="127.23450247038662 44.411500823462205"
        strokeWidth="2"
      >
        <animateTransform
          attributeName="transform"
          dur="1.5s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Loader;
