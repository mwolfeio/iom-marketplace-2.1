// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Chev from "assets/icons/ChevRight";

export default function Comp({ pageCount, page, setPage }) {
  // console.log("items: ", pageCount, page, setPage);

  return (
    <div
      className="flex-align-center flex-justify-center list-spacing-sml"
      style={{ marginTop: "1rem" }}
    >
      {page !== 0 && (
        <button className="icon" onClick={() => setPage(page - 1)}>
          <div style={{ transform: "rotate(180deg)" }}>
            <Chev />
          </div>
        </button>
      )}
      {[...Array(pageCount)].map((e, i) => (
        <button
          className={`icon ${i === page ? "active" : ""}`}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </button>
      ))}

      {page !== pageCount - 1 && (
        <button className="icon" onClick={() => setPage(page + 1)}>
          <Chev />
        </button>
      )}
      <style jsx>{`
        button.active {
          background: #fff;
          color: #1d2028;
        }
      `}</style>
    </div>
  );
}
