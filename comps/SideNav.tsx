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
  reset,
  query,
  setQuery,
  canReset,
}) {
  // const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log("loaded");
  }, []);

  return (
    <>
      <div className="side-nav-wrapper vert-space-med ">
        {filter.map(({ type, lable, options, keyField }) => {
          switch (type) {
            case "pop":
              return <PopDown data={options} />;
              break;
            case "slider":
              return (
                <Range
                  lable={lable}
                  query={query}
                  setQuery={setQuery}
                  data={options}
                  keyField={keyField}
                />
              );
              break;
            case "drop":
              return (
                <Dropdown
                  keyField={keyField}
                  lable={lable}
                  data={options}
                  query={query}
                  setQuery={setQuery}
                />
              );
              break;
            default:
              return <div className="div-line" />;
              break;
          }
        })}
        <div className="flex-align-center flex-justify-left list-spacing-sml">
          {canReset && (
            <button className="icon-text" onClick={() => reset()}>
              <Clear />
              <span>Clear</span>
            </button>
          )}
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
