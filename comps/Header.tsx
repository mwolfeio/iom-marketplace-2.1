import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";

import Image from "next/image";
import Link from "next/link";
import Banner from "comps/Banner";
import Box from "assets/icons/Box";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Header() {
  const [boxCount, setBoxCount] = useState(0);
  const [iom, setIom] = useState(0);
  const { user, mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("user: ", user);

    if (user && user.isLoggedIn && user.balances) {
      setBoxCount(
        user.balances.filter((obj) => obj.token.indexOf("BOX") !== -1).length
      );
      setIom(user.balances.filter((obj) => obj.token === "IOM")[0].amount);
    }
  }, [user]);

  return (
    <>
      {boxCount > 0 && (
        <Banner
          icon={Box}
          text={`You have ${boxCount} Box${boxCount > 1 && "es"} to Open!`}
        />
      )}
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/games">
                <a>Games</a>
              </Link>
            </li>
            <li>
              <Link href="/boxes">
                <a>Boxes</a>
              </Link>
            </li>
            <li>
              <Link href="/game-items">
                <a>Game Items</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>NFT Marketplace</a>
              </Link>
            </li>
            {user?.isLoggedIn === false && (
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            )}
            {user?.isLoggedIn === true && (
              <>
                <li className="wallet-wrapper">
                  <Link href="/wallet">
                    <a>
                      <span>{numberWithCommas(iom)} $IOM </span>{" "}
                      <span> Wallet</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="/api/logout"
                    onClick={async (e) => {
                      e.preventDefault();
                      mutateUser(
                        await fetchJson("/api/logout", { method: "POST" }),
                        false
                      );
                      router.push("/login");
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }
        .wallet-wrapper {
          height: 40px;

          transition: 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
          background: #ffffff00;
          border-radius: 50px;
          cursor: pointer;
          ${router.asPath != "/wallet"
            ? "border: 1px solid rgba(255, 255, 255, 0.3); padding: 0 1rem;"
            : ""};
        }
        ${router.asPath != "/wallet"
          ? ".wallet-wrapper:hover {background: #ffffff10;}"
          : ""}
        .wallet-wrapper a > *:first-child {
          ${router.asPath != "/wallet" ? "" : "display: none"};
        }
        .wallet-wrapper a > *:first-child::after {
          content: "";
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          height: 24px;
          margin: 0 1rem;
        }
        header {
          height: 64px;
          box-sizing: border-box;
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </>
  );
}
