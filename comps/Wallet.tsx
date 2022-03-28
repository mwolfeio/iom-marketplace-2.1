// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Comp({ data }) {
  const [bal, setBal] = useState(0);
  useEffect(() => {
    if (data && data.length) setBal(numberWithCommas(data[0].amount));
  }, [JSON.stringify(data)]);

  return (
    <>
      <div className="wallet-wrapper flex-col flex-align-center">
        <h1 style={{ color: "rgb(255, 206, 56)" }}>{bal} IOM</h1>
        <p>
          <b>$0.00 USD</b>
        </p>
        <div
          className="list-spacing-sml flex-align-center"
          style={{ marginTop: "1rem" }}
        >
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
      </div>
      <style jsx>
        {`
          .wallet-wrapper {
            margin: 1rem auto;
            padding-bottom: 1rem;
          }
          h1 {
            font-size: 60px;
          }
        `}
      </style>
    </>
  );
}
