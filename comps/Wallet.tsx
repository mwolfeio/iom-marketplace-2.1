// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Comp({ data }) {
  const [bal, setBal] = useState(0);
  useEffect(() => {
    console.log("data: ", data);

    if (data && data.length) setBal(data[0].amount);
  }, [JSON.stringify(data)]);

  return (
    <>
      <h1>{bal} IOM</h1>
      <p>
        <b>$0.00 USD</b>
      </p>
      <div className="list-spacing-sml flex-align-center">
        <Link href="/wallet/deposit">
          <a>
            <button className="turciary">Deposit</button>
          </a>
        </Link>
        <Link href="/wallet/withdraw">
          <a>
            <button className="turciary">Withdraw</button>
          </a>
        </Link>
        <a target="_blank" href="https://pancakeswap.finance/swap">
          <button className="primary">Get More</button>
        </a>
      </div>
    </>
  );
}
