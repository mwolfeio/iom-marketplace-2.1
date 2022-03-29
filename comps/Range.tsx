// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";

import Chev from "assets/icons/ChevDown";
import SliderBack from "assets/media/SliderBack";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function GalleryPage({
  lable,
  query,
  data,
  setQuery,
  keyField,
}) {
  const [range, setRange] = useState(10000);
  // const [debouncedState, setDebouncedState] = useState(100000);

  useEffect(() => {
    console.log("query changed");
    setRange(query.priceTo);
  }, [JSON.stringify(query)]);

  const handleChange = (event: any) => {
    console.log("search:", event.target.value);
    setRange(event.target.value);
    debounce(event.target.value);
  };

  const debounce = useCallback(
    _.debounce((_searchVal: number) => {
      console.log("RUNNING QUERY AGAIN");

      let p = { ...query };
      console.log("old querty", p);
      p[keyField] = parseInt(_searchVal);
      console.log("new query = ", p);
      setQuery(p);

      // setDebouncedState(_searchVal);
    }, 1000),
    []
  );

  return (
    <>
      <div>
        {lable && <span className="dropdown-label">{lable}</span>}
        <div className="flex-align-center flex-col">
          <div
            style={{ width: "100%" }}
            className="flex-align-center flex-justify-btw"
          >
            <input
              style={{ padding: "8px 0" }}
              type="range"
              name="amount"
              onChange={handleChange}
              value={range}
              min={1}
              max={10000}
              required
            />
          </div>
          <div
            style={{ width: "100%", fontSize: "12px", marginTop: "8px" }}
            className="flex-align-center flex-justify-btw"
          >
            <span>0.01 $IOM</span>
            <span>
              <b style={{ color: "#3772ff" }}>{numberWithCommas(range)} $IOM</b>
            </span>
            <span>10k $IOM</span>
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
