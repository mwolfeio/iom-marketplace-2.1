// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "comps/Loader";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const generateColumns = (s, height) => {
  let str = "";
  s.forEach(({ type }, i) => {
    switch (type) {
      case "text":
        str = str + "1fr ";
        break;
      case "status":
        str = str + "1fr ";
        break;
      case "number":
        str = str + "1fr ";
        break;
      case "address":
        str = str + "1fr ";
        break;
      case "icon":
        str = str + height + " ";
        break;
      case "button":
        str = str + "100px ";
        break;
    }
  });
  return str;
};

export default function Comp({
  loading,
  data = [],
  schema,
  height = "48px",
  title,
  placeholder = "Empty",
  icon,
}) {
  const [grid, setGrid] = useState(0);

  const getStatus = (s) => {
    switch (s) {
      case "IN_PROCESS":
        return <span style={{ opacity: 0.6 }}>Processing...</span>;
        break;
      default:
        return <span style={{ color: "#219653" }}>confirmed...</span>;
    }
  };

  useEffect(() => {
    setGrid(generateColumns(schema, height));
  }, [JSON.stringify(schema)]);

  return (
    <div>
      {title && <h3>{title}</h3>}
      <ul>
        <li className="header">
          {schema.map(({ name, key }) => (
            <p>
              <b>{name ? name : key}</b>
            </p>
          ))}
        </li>
        {loading ? (
          <li className="palceholde-wrapper flex-justify-center flex-align-center">
            <Loader />
          </li>
        ) : data.length ? (
          <>
            {data.map((itm) => (
              <li key={`list-tiem-${Math.random()}`}>
                {schema.map(
                  ({ type, key, hook, hookType, className, count, comp }) => {
                    if (type === "text") return <p>{itm[key]}</p>;
                    if (type === "status") return <p>{getStatus(itm[key])}</p>;
                    if (type === "number")
                      return <p>{numberWithCommas(itm[key])}</p>;
                    if (type === "address")
                      return (
                        <p>
                          {itm[key].substring(0, 5)}...
                          {itm[key].substring(itm[key].length - 5)}
                        </p>
                      );

                    if (type === "icon") {
                      if (icon) {
                        let Cop = icon;
                        return <Cop />;
                      } else if (comp) {
                        let Cop = comp(itm.token);
                        return <Cop />;
                      } else {
                        return (
                          <div className="icon" style={{ margin: "auto" }} />
                        );
                      }
                    }
                    if (type === "button")
                      return (
                        <div style={{ justifyContent: "flex-start" }}>
                          <button
                            className={className}
                            onClick={() => {
                              if (hookType === "link") {
                                return hook(itm.walletAddress);
                              }
                              hook(
                                itm.token,
                                count == "all" ? itm.amount : count
                              );
                            }}
                            style={{ margin: "auto" }}
                          >
                            {key}
                          </button>
                        </div>
                      );
                  }
                )}
              </li>
            ))}
          </>
        ) : (
          <li className="palceholde-wrapper flex-justify-center flex-align-center">
            {placeholder}
          </li>
        )}
      </ul>
      <style jsx>{`
        li.palceholde-wrapper {
          text-align: center;
          display: flex;
          font-weight: 700;
          opacity: 0.3;
        }
        ul {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid white;
          margin: 1rem 0;
          background: #1d2028;
          overflow-x: scroll;
        }

        li {
          height: ${height};
          padding: 0 1rem;
          display: grid;
          grid-gap: 0.5rem;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          transition: 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
          grid-template-columns: ${grid};
        }
        li .icon {
          width: 8px;
          height: 8px;
          border-radius: 100%;
          border: 1px solid white;
        }
        ul li button {
          height: 28px;
          width: 100%;
          border-radius: 3rem;
        }

        li:nth-child(2n) {
          background: #ffffff10;
        }

        li:hover {
          background: #ffffff15;
        }

        li.header:hover {
          background: none;
        }
        li.header {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #b1b5c3;
        }
      `}</style>
    </div>
  );
}

//            <pre>{JSON.stringify(itm, null, 2)}</pre>
