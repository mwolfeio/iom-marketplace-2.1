// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Comp({ children, hook, active, clickable }) {
  // const [bal, setBal] = useState(0);
  // useEffect(() => {
  //   if (data && data.length) setBal(numberWithCommas(data[0].amount));
  // }, [JSON.stringify(data)]);

  const click = () => {
    if (clickable) hook();
  };

  return (
    <>
      <div
        className={`bubble-wrapper flex-align-center list-spacing-sml ${
          active ? "active" : ""
        }`}
        onClick={() => click()}
      >
        {children}
      </div>

      <style jsx>{`
        .bubble-wrapper.active {
          background: #ffffff30;
          color: #ffffff;
        }
        .bubble-wrapper {
          height: 36px;
          background: #ffffff10;
          color: #ffffff60;
          padding: 0 1rem;
          border-radius: 3rem;
          transition: 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
          ${clickable && "cursor: pointer;"}
        }
        .bubble-wrapper:hover {
          ${clickable && "color: #ffffff;"}
          ${clickable && "background: #ffffff20;"}
        }
      `}</style>
    </>
  );
}
