import React from "react";

function Icon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.5 2.75a7.75 7.75 0 100 15.5 7.75 7.75 0 000-15.5zM1.25 10.5a9.25 9.25 0 1118.5 0 9.25 9.25 0 01-18.5 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.97 15.97a.75.75 0 011.06 0l4.5 4.5a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;
