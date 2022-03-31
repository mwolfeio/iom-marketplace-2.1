// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";
import { UserContext } from "lib/UserContext";

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
  const { mutateUser } = useUser();
  const router = useRouter();
  const user = useContext(UserContext);

  console.log("HEADER NEW USER: ", user);

  const signOut = async (e) => {
    e.preventDefault();
    mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
    router.push("/login");
  };

  useEffect(() => {
    console.log("user updated: ", user);

    if (user && user.isLoggedIn && user.balances) {
      let b = user.balances.filter((obj) => obj.token.indexOf("BOX") !== -1);
      setBoxCount(
        b.reduce(function (a, b) {
          return a + b.amount;
        }, 0)
      );
      let red = user.balances.filter((obj) => obj.token === "IOM")[0];
      console.log("red: ", red);

      setIom(red ? red.amount : 0);
    }
  }, [JSON.stringify(user)]);

  return (
    <>
      {open && (
        <div
          className="mobile-menu-back desktop-hide"
          onClick={() => setOpen(false)}
        >
          <nav
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="mobile-menu"
          >
            <ul>
              <li>
                <Navlink exact href="/ ">
                  NFT Marketplace
                </Navlink>
              </li>
              <li>
                <Navlink href="/game-items">Game Items</Navlink>{" "}
              </li>
              <li>
                <Navlink href="/boxes">Boxes</Navlink>
              </li>
              <li>
                <Navlink href="/games">Games</Navlink>
              </li>
            </ul>
            <div className="mobile-button-wrap flex-align-center flex-justify-center list-spacing-sml">
              <Link href="/wallet/deposit">
                <a>
                  <button>Deposit</button>
                </a>
              </Link>
              <Link href="/wallet/withdraw">
                <a>
                  <button>Withdraw</button>
                </a>
              </Link>

              <button onClick={signOut}>Sign Out</button>
            </div>
          </nav>
        </div>
      )}
      {boxCount > 0 && (
        <div className={`${open && "active"} `}>
          <Banner
            icon={Box}
            text={`You have ${boxCount} Box${
              boxCount > 1 ? "es" : ""
            } to Open!`}
          />
        </div>
      )}
      <header
        className={`flex-align-center flex-justify-btw ${open && "active"}`}
      >
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
            {user.isLoggedIn === false && (
              <>
                <li className="mobile-menu-content">
                  <Link href="/login">
                    <a>
                      <button className="">Login</button>
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://play.influencersofthemetaverse.com/"
                    target="_blank"
                  >
                    <button className="primary">Play</button>
                  </a>
                </li>
              </>
            )}
            {user.isLoggedIn === true && (
              <>
                <li className="wallet-wrapper flex-align-center mobile-menu-content">
                  <Link href="/wallet">
                    <a>
                      <span
                        style={{ display: "none", color: "rgb(255, 206, 56)" }}
                      >
                        {numberWithCommas(iom)} $IOM{" "}
                      </span>
                      <span> Wallet</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://play.influencersofthemetaverse.com/"
                    target="_blank"
                  >
                    <button className="primary">Play</button>
                  </a>
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
          onClick={() => setOpen(!open)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </header>

      <style jsx>{`
        .mobile-button-wrap {
          padding: 1rem 1rem;
          box-sizing: border-box;
          margin= auto;
          border-top: 1px solid #ffffff30;


        }
        .mobile-button-wrap>*, .mobile-button-wrap>*>*{
          width: 100%;
          max-width: 130px;
        }
        .mobile-menu {
          position: absolute:
          z-index: 22;
          background: #242830;
          padding-top: ${boxCount > 0 ? "96px" : "64px"};
        }
          .mobile-menu ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: .5rem
          }
          .mobile-menu ul li {
            height: 40px;
            width: 100%;
            font-weight: 700;
            text-align: center;
            display: flex;
            align-items: center;
          }
          .mobile-menu ul li {
          display: flex;
          align-items: center;
          justify-content: center;
            width: 100%;
            tex-align: center;
          }
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
        header ul {
          display: flex;
          align-items: center;
          height: 40px;
          list-style: none;
          padding: 8px 0;
          margin: 0;
        }

        header li:first-child {
          margin-left: auto;
        }

        header a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        header a img {
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
        header{
          position: relatie;
          z-index: 24;
          padding: 0.5rem 1rem;
          box-sizing: border-box;
          color: #fff;width: 100%
          max-width: 1300px;
          margin: auto;
        }

        .active,
        header.active{
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 24;
        }

        header.active{
          top: ${boxCount > 0 ? "32px" : "0"};
        }

        @media (min-width: 768px) {

          .active,
          header.active {
            width: 100%;
              position: relative;
            top: 0;
            left: 0;
            z-index: 24;
          }
        }
      `}</style>
    </>
  );
}
