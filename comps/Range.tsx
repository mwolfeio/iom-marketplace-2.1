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
          <span>Range</span>
          <div className="chev flex-align-center flex-justify-center">
            <Chev />
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          color: white;
        }
      `}</style>
    </>
  );
}
