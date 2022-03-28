// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Comp({ children }) {
  // const [bal, setBal] = useState(0);
  // useEffect(() => {
  //   if (data && data.length) setBal(numberWithCommas(data[0].amount));
  // }, [JSON.stringify(data)]);

  return (
    <>
      <div className="bubble-wrapper flex-align-center">{children}</div>

      <style jsx>{`
        .bubble-wrapper {
          height: 36px;
          background: #ffffff10;
          color: #ffffff60;
          padding: 0 1rem;
          border-radius: 3rem;
        }
      `}</style>
    </>
  );
}
