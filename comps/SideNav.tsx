// @ts-nocheck
import React, { useState, useEffect } from "react";

import Dropdown from "comps/Dropdown";
import PopDown from "comps/Popdown";
import Range from "comps/Range";

import Clear from "assets/icons/Close";

export default function GalleryPage({
  data,
  width = "256px",
  filter = [],
  open = true,
}) {
  // const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log("loaded");
  }, []);

  return (
    <>
      <div className="side-nav-wrapper vert-space-med ">
        {filter.map(({ type, lable, options }) => {
          switch (type) {
            case "pop":
              return <PopDown data={options} />;
              break;
            case "slider":
              return <Range />;
              break;
            case "drop":
              return <Dropdown lable={lable} data={options} />;
              break;
            default:
              return <div className="div-line" />;
              break;
          }
        })}
        <div className="flex-align-center flex-justify-left list-spacing-sml">
          <div className="flex-align-center list-spacing-sml">
            <Clear />
            <span>Clear</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .side-nav-wrapper {
          display: flex;
          flex-direction: column;

          width: ${open ? width : "0"};
          min-width: ${open ? width : "0"};
          margin-right: ${open ? "1rem" : "0"};
          max-height: Calc(100vh - 162px);
          ${open ? "  overflow-y: auto;" : "  overflow-x: hidden;"};
        }
        .div-line {
          border-bottom: 1px solid #353945;
        }
      `}</style>
    </>
  );
}
