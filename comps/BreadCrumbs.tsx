import Router from "next/router";
import Link from "next/link";

import Chev from "assets/icons/ChevRight";

export default function Comp() {
  return (
    <>
      <div className="list-spacing-med flex-align-center">
        <Link href="/wallet">
          <button className="icon-text ">
            <div style={{ transform: "rotate(180deg)" }}>
              <Chev />
            </div>
            <span>Back</span>
          </button>
        </Link>

        <div>
          <Link href="/wallet">
            <a>Wallet</a>
          </Link>
          / Deposits
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
