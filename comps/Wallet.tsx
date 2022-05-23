// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";

function numberWithCommas(x) {
  let str = x.toString();
  let strArr = str.toString().split(".");
  strArr[0] = strArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return strArr.join(".");
}

export default function Comp({ iom, bnb }) {
  const [iombal, setIomBal] = useState(0);
  const [bnbbal, setBnbBal] = useState(0);

  useEffect(() => {
    if (iom && iom.length) {
      setIomBal(numberWithCommas(iom[0].amount));
    }
    if (bnb && bnb.length) {
      setBnbBal(numberWithCommas(bnb[0].amount));
    }
  }, [iom, bnb]);

  return (
    <>
      <div className="wallet-wrapper flex-col flex-align-center">
        <h1 style={{ color: "rgb(255, 206, 56)" }}>{iombal} IOM</h1>
        <p>
          <b>{bnbbal} BNB</b>
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
