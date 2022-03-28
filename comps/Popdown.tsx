// @ts-nocheck
import React, { useState, useEffect } from "react";

import Chev from "assets/icons/ChevDown";

export default function GalleryPage({ data }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log("loaded");
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="flex-align-center flex-justify-btw">
          <span>Pop Dwon</span>
          <div className="chev flex-align-center flex-justify-center">
            <Chev />
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          border: 1px solid #353945;
          color: #fcfcfd;
          line-height: 1.25;
          padding: 0.5rem 0.75rem;
          border-radius: 0.25rem;
          transition: 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
          background: #1d2028;
          width: 100%;
          text-align: left;
          font-size: 1rem;
          box-sizing: border-box;
          cursor: pointer;
          line-height: 1.5rem;
        }
        .wrapper .chev {
          transform: rotate(${open ? 180 : 0}deg);
          color: #777e90;
          width: 32px;
          height: 32px;
          border-radius: 100%;
          border: 1px solid #353945;
        }
        .wrapper:hover .chev {
          color: white;
        }
      `}</style>
    </>
  );
}
