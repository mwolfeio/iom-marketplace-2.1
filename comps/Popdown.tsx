// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";

import Chev from "assets/icons/ChevDown";

export default function GalleryPage({
  lable,
  data,
  keyField,
  keyField2,
  selected,
  setQuery,
  query,
  prefix,
}) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [active, setActive] = useState();
  const descRef = useRef();

  function expand() {
    setExpanded(true);
  }

  function close() {
    setExpanded(false);
  }

  function select(value) {
    close();
    descRef.current.blur();
  }

  useEffect(() => {
    if (data) {
      const i = data.findIndex(
        (x) =>
          JSON.stringify(x.value) == JSON.stringify(query[keyField]) &&
          JSON.stringify(x.value2) == JSON.stringify(query[keyField2])
      );
      setActive(i === -1 ? 0 : i);
      setList(data);
    }
  }, [JSON.stringify(data), JSON.stringify(query)]);

  const addToQuery = (val, val2) => {
    let p = { ...query };
    p[keyField] = val;
    p[keyField2] = val2;
    setQuery(p);
  };

  return (
    <>
      {lable && <span className="dropdown-label">{lable}</span>}
      <div className="wrapper">
        <div
          onClick={() => setOpen(!open)}
          className="header flex-align-center flex-justify-btw"
        >
          <span>
            <span style={{ opacity: 0.6 }}>{prefix ? prefix : ""} </span>
            {data[active] ? data[active].key : ""}
          </span>
          <div className="chev flex-align-center flex-justify-center">
            <Chev />
          </div>
        </div>
        <ul className={`${open && "open"}`}>
          {list.map(({ key, value, value2 }, i) => (
            <li
              onClick={() => addToQuery(value, value2)}
              className={`flex-align-center flex-justify-left list-spacing-sml ${
                active === i ? "active" : ""
              }`}
            >
              {key}
            </li>
          ))}
        </ul>
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
          position: relative;
          border: 1px solid #353945;
          color: #fcfcfd;
          line-height: 1.25;
          border-radius: 0.25rem;
          transition: 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
          background: #1d2028;
          width: 100%;
          text-align: left;
          font-size: 1rem;
          box-sizing: border-box;
          cursor: pointer;
          line-height: 1.5rem;
          background: rgb(35, 38, 47);
        }
        .header {
          padding: 0.5rem 0.75rem;
        }
        .wrapper .chev {
          transition: 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);

          transform: rotate(${open ? 180 : 0}deg);
          color: #777e90;
          width: 32px;
          height: 32px;
          border-radius: 100%;
          border: 1px solid #353945;
        }
        .wrapper .header:hover .chev {
          color: white;
        }
        ul {
          height: 0;
          border-top: 1px solid #35394500;
          overflow: hidden;
          visibility: hidden;
          transition: 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        ul.open {
          height: ${list.length * 40}px;
          border-top: 1px solid #353945;
          margin: 0 0.75rem 0.25rem;
          padding-top: 0.25rem;
          box-sizing: content-box;
          visibility: visible;
          overflow: visible;
        }
        li {
          height: 40px;
          width: Calc(100% + 1rem);
          border-radius: 0.5rem;
          background: #ffffff00;
          margin: 0 -0.5rem;
          padding: 0 0.5rem;
          transition: 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        li.active {
          color: #3772ff;
        }
        li:hover {
          background: #ffffff10;
        }
      `}</style>
    </>
  );
}
