// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";

import Image from "next/image";
import Link from "next/link";
import Navlink from "comps/Navlink";
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
      <header className="flex-align-center flex-justify-btw">
        <Link href="/">
          <a>
            <Image height="80px" width="190px" src="/logo.svg" />
          </a>
        </Link>
        <nav>
          <ul className="list-spacing-med">
            <li>
              <Navlink href="/games">Games</Navlink>
            </li>
            <li>
              <Navlink href="/boxes">Boxes</Navlink>
            </li>
            <li>
              <Navlink href="/game-items">Game Items</Navlink>
            </li>
            <li>
              <Navlink exact href="/">
                NFT Marketplace
              </Navlink>
            </li>
            {user?.isLoggedIn === false && (
              <li>
                <Navlink href="/login">Login</Navlink>
              </li>
            )}
            {user?.isLoggedIn === true && (
              <>
                <li className="wallet-wrapper flex-align-center">
                  <Link href="/wallet">
                    <a>
                      <span style={{ color: "rgb(255, 206, 56)" }}>
                        {numberWithCommas(iom)} $IOM{" "}
                      </span>{" "}
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
          align-items: center;
          height: 40px;
          list-style: none;
          padding: 8px 0;
          margin: 0;
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
          padding: 0.5rem 1rem;
          box-sizing: border-box;
          color: #fff;
        }
      `}</style>
    </>
  );
}
