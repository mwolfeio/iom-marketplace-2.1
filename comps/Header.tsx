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
import MoreButton from "comps/MoreButton";
import Menu from "assets/icons/Menu";
import Close from "assets/icons/Close";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Header() {
  const [boxCount, setBoxCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [iom, setIom] = useState(0);
  const { user, mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("user: ", user);

    if (user && user.isLoggedIn && user.balances) {
      let b = user.balances.filter((obj) => obj.token.indexOf("BOX") !== -1);
      setBoxCount(
        b.reduce(function (a, b) {
          return a + b.amount;
        }, 0)
      );
      setIom(user.balances.filter((obj) => obj.token === "IOM")[0].amount);
    }
  }, [user]);

  return (
    <>
      {open && (
        <div className="mobile-menu-back" onClick={() => setOpen(false)}>
          <div className="mobile-menu"></div>
        </div>
      )}
      {boxCount > 0 && (
        <Banner
          icon={Box}
          text={`You have ${boxCount} Box${boxCount > 1 && "es"} to Open!`}
        />
      )}
      <header className="flex-align-center flex-justify-btw">
        <Link href="/">
          <a className="mobile-hide">
            <Image height="80px" width="190px" src="/logo.svg" />
          </a>
        </Link>
        <Link href="/">
          <a className="desktop-hide mobile-menu-content">
            <Image
              height="48px"
              width="48px"
              src="/android-chrome-192x192.png"
            />
          </a>
        </Link>
        <nav>
          <ul className="list-spacing-med">
            <li className="mobile-hide">
              <Navlink href="/games">Games</Navlink>
            </li>
            <li className="mobile-hide">
              <Navlink href="/boxes">Boxes</Navlink>
            </li>
            <li className="mobile-hide">
              <Navlink href="/game-items">Game Items</Navlink>
            </li>
            <li className="mobile-hide">
              <Navlink exact href="/">
                NFT Marketplace
              </Navlink>
            </li>
            {user?.isLoggedIn === false && (
              <li className="mobile-menu-content">
                <Link href="/login">
                  <a>
                    <button className="primary">Login</button>
                  </a>
                </Link>
              </li>
            )}
            {user?.isLoggedIn === true && (
              <>
                <li className="wallet-wrapper flex-align-center mobile-menu-content">
                  <Link href="/wallet">
                    <a>
                      <span style={{ color: "rgb(255, 206, 56)" }}>
                        {numberWithCommas(iom)} $IOM{" "}
                      </span>{" "}
                      <span> Wallet</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-hide">
                  <MoreButton />
                </li>
              </>
            )}
          </ul>
        </nav>
        <button
          className="icon desktop-hide mobile-menu-content"
          onClick={() => setOpen(true)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </header>

      <style jsx>{`
        .mobile-menu-content {
          position: relative;
          z-index: 25;
        }
        .mobile-menu-back {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 20;
          width: 100vw;
          height: 100vh;
          backdrop-filter: blur(4px);
          background: rgba(0, 0, 0, 0.8);
        }
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
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0 1rem;
        }
        .wallet-wrapper:hover {
          background: #ffffff10;
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
          max-width: 1300px;
          margin: auto;
        }
        @media (min-width: 768px) {
        }
      `}</style>
    </>
  );
}
