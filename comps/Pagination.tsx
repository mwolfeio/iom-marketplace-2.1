// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Comp({ data }) {
  const [bal, setBal] = useState(0);
  useEffect(() => {
    console.log("data: ", data);
  }, []);

  return (
    <div
      className="flex-align-center flex-justify-center list-spacing-sml"
      style={{ marginTop: "1rem" }}
    >
      <button className="icon">{`<`}</button>
      <div>page 1</div>
      <button className="icon">{`>`}</button>
    </div>
  );
}
