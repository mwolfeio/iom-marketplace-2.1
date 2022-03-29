// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "comps/Loader";

const generateColumns = (s, height) => {
  let str = "";
  s.forEach(({ type }, i) => {
    switch (type) {
      case "text":
        str = str + "1fr ";
        break;
      case "icon":
        str = str + height + " ";
        break;
      case "button":
        str = str + "auto ";
        break;
    }
  });
  console.log("str = ", str);
  return str;
};

export default function Comp({
  loading,
  data = [],
  schema,
  height = "48px",
  title,
  placeholder = "Empty",
}) {
  const [grid, setGrid] = useState(0);

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
          <Loader />
        ) : data.length ? (
          <>
            {data.map((itm) => (
              <li key={`list-tiem-${Math.random()}`}>
                {schema.map(({ type, key, hook, className, count }) => {
                  if (type === "text") return <p>{itm[key]}</p>;
                  if (type === "icon")
                    return <div className="icon" style={{ margin: "auto" }} />;
                  if (type === "button")
                    return (
                      <button
                        className={className}
                        onClick={() =>
                          hook(itm.token, count == "all" ? itm.amount : count)
                        }
                        style={{ margin: "auto" }}
                      >
                        {key}
                      </button>
                    );
                })}
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
          width: fit-content;
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
      `}</style>
    </div>
  );
}

//            <pre>{JSON.stringify(itm, null, 2)}</pre>
