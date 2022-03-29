// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";

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
  setOpen,
  canReset,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={`mobile-back ${open ? "" : "not-expanded"}`}
        onClick={() => setOpen(true)}
      >
        <div
          className={`side-nav-wrapper vert-space-med ${
            open ? "" : "not-expanded"
          }`}
        >
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
          <button onClick={() => setOpen(true)} className="mobile-close">
            Close
          </button>
        </div>
      </div>
      <style jsx>{`
        .side-nav-wrapper {
          display: flex;
          flex-direction: column;
          width: ${open ? "0" : width};
          min-width: ${open ? "0" : width};
          max-height: 100vh;

          ${open ? "  overflow-x: hidden;" : "  overflow-y: auto;"}
          z-index: 30;

          position: fixed;
          top: 0;
          left: 256px;
          opacity: 0;
          background: #1d2028;
          height: 100vh;
          padding: 40px 1rem 1rem;
          box-shadow: 8px 4px 12px rgba(0, 0, 0, 0.32);
        }
        .not-expanded {
          left: 0;
          opacity: 1;
        }
        .div-line {
          border-bottom: 1px solid #353945;
        }
        mobile-back {
        }
        .mobile-back.not-expanded {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          width: 100vw;
          height: 100vh;
          backdrop-filter: blur(4px);
          background: rgba(0, 0, 0, 0.8);
        }

        @media (min-width: 768px) {
          .mobile-back.not-expanded {
            position: relative;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 0;
            height: 0;
            z-index: auto;

            backdrop-filter: none;
            background: none;
          }

          .mobile-close {
            display: none;
          }
          .side-nav-wrapper {
            opacity: 1;
            position: relative;
            top: 0;
            left: 0;
            background: none;
            height: auto;
            padding: 0;
            box-shadow: none;

            display: flex;
            flex-direction: column;
            width: ${open ? width : "0"};
            min-width: ${open ? width : "0"};
            margin-right: ${open ? "1rem" : "0"};
            max-height: Calc(100vh - 162px);
            ${open ? "  overflow-y: auto;" : "  overflow-x: hidden;"};
          }
        }
      `}</style>
    </>
  );
}
