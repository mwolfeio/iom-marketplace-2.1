// @ts-nocheck
import React, { useState, useEffect } from "react";

import Chev from "assets/icons/ChevDown";
import SliderBack from "assets/media/SliderBack";

export default function GalleryPage({ lable, data }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log("loaded");
  }, []);

  return (
    <>
      <div>
        {lable && <span className="dropdown-label">{lable}</span>}
        <div className="flex-align-center flex-col">
          <div
            style={{ width: "100%" }}
            className="flex-align-center flex-justify-btw"
          >
            <SliderBack />
          </div>
          <div
            style={{ width: "100%", fontSize: "12px", marginTop: "8px" }}
            className="flex-align-center flex-justify-btw"
          >
            <span>0.01 $IOM</span>
            <span>0.01 $IOM</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        span.dropdown-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #b1b5c3;
          display: block;
          margin-bottom: 12px;
        }
        .wrapper {
          color: white;
        }
      `}</style>
    </>
  );
}
