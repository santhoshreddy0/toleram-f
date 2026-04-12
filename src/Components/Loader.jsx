import React from "react";

const Loader = (props) => {
  const width = props.width ? props.width : 100;
  const height = props.height ? props.height : 100;
  const primary = props.color ? props.color : "#f8d06f";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width={width}
      height={height}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 120 120"
    >
      <defs>
        <linearGradient id="loaderRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primary} />
          <stop offset="60%" stopColor="#e8b34f" />
          <stop offset="100%" stopColor="#59cbff" />
        </linearGradient>
      </defs>

      <circle
        cx="60"
        cy="60"
        r="35"
        fill="none"
        stroke="rgba(248,208,111,0.2)"
        strokeWidth="6"
      />
      <circle
        cx="60"
        cy="60"
        r="35"
        fill="none"
        stroke="url(#loaderRing)"
        strokeLinecap="round"
        strokeDasharray="132 88"
        strokeWidth="6"
      >
        <animateTransform
          attributeName="transform"
          dur="1.15s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 60 60;360 60 60"
        />
      </circle>

      <g>
        <animateTransform
          attributeName="transform"
          dur="1.15s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 60 60;-360 60 60"
        />
        <circle cx="60" cy="60" r="14" fill="#d4473f" />
        <path
          d="M52 49 C60 56, 60 64, 52 71"
          fill="none"
          stroke="#ffe3d7"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M68 49 C60 56, 60 64, 68 71"
          fill="none"
          stroke="#ffe3d7"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <circle cx="95" cy="60" r="3.2" fill="#59cbff">
        <animateTransform
          attributeName="transform"
          dur="1.15s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 60 60;360 60 60"
        />
      </circle>

      <rect
        x="44"
        y="86"
        width="32"
        height="2.4"
        rx="1.2"
        fill="rgba(248,208,111,0.45)"
      >
        <animate
          attributeName="opacity"
          dur="1.15s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="0.5;1;0.5"
        />
      </rect>
      <rect
        x="48"
        y="91"
        width="24"
        height="2"
        rx="1"
        fill="rgba(89,203,255,0.4)"
      >
        <animate
          attributeName="opacity"
          dur="1.15s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="0.35;0.8;0.35"
        />
      </rect>
      <circle cx="60" cy="60" r="1.8" fill="#fff6df">
        <animate
          attributeName="opacity"
          dur="0.8s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="0.4;1;0.4"
        />
      </circle>
    </svg>
  );
};

export default Loader;
