// @ts-nocheck
import React from "react";
import { useState } from "react";

import Image from "next/image";

import Facebook from "../assets/socials/Facebook";
import Twitter from "../assets/socials/Twitter";
import Youtube from "../assets/socials/Youtube";
import Insta from "../assets/socials/Insta";
import Disc from "../assets/socials/Disc";

const getYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  const [date, setDate] = useState(getYear());

  return (
    <>
      <footer>
        <div>
          <div>
            <img className="footer-logo tablet-hide" src="/logo.svg" />
          </div>
          <div className="footer-nav">
            <List
              title="Exchanges"
              links={[
                { text: "PancakeSwap", link: "https://pancakeswap.finance/" },
                { text: "PooCoin", link: "https://poocoin.app/" },
              ]}
            />
            <List
              title="Resources"
              links={[
                {
                  text: "Landing Page",
                  link: "https://influencersofthemetaverse.com/",
                },
                {
                  text: "White Paper",
                  link: "https://whitepaper.influencersofthemetaverse.com/",
                },
                { text: "Coin Marketcap", link: "" },
              ]}
            />

            <List
              title="Contact Us"
              style="mini-mobile-hide"
              links={[
                { text: "Email", link: "" },
                { text: "Phone", link: "" },
                { text: "Social Media", link: "" },
              ]}
            />
          </div>
          <Socials
            title="Follow"
            links={[
              { icon: Facebook, link: "" },
              { icon: Twitter, link: "" },
              { icon: Youtube, link: "" },
              { icon: Insta, link: "" },
              { icon: Disc, link: "" },
            ]}
          />
        </div>
      </footer>
      <div className="legal flex-justify-center flex-align-center">
        Ⓒ Copyright Influencers of the Metaverse, {date}
      </div>
      <style jsx>
        {`
          footer {
            background: #1d2028;
            border-top: 1px solid #ffffff60;
          }
          footer > * {
            max-width: 1200px;
            margin: auto;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 24px;
            text-align: center;
            padding: 1rem 0 2rem;
          }
          footer img.footer-logo {
            display: block;
            width: 100%;
            margin-top: -24px;
          }

          footer span {
            font-size: 18px;
            line-height: 18px;
            text-transform: uppercase;
            font-weight: 700;
          }

          footer div.footer-nav {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 16px;
          }

          footer .links li a {
            opacity: 0.6;
            display: block;
            box-sizing: border-box;
            padding: 4px 0;
            transition: 0.15s ease;
          }
          footer .links li a:hover {
            opacity: 1;
          }
          footer .socials ul {
            justify-content: center;
          }

          footer .socials li {
            height: 36px;
            width: 36px;
            border-radius: 100%;
            background: #33363d;
            transition: 0.15s ease;
          }
          footer .socials li svg {
            display: block;
          }

          footer .socials li:hover {
            background: white;
          }
          footer .socials li:hover svg path {
            fill: #1d2028;
          }
          footer a {
            color: #ffffff60;
          }
          footer a:hover {
            color: #ffffff;
          }

          .legal {
            color: #b2b3b6;
            background: #12151b;
            font-size: 14px;
            height: 32px;
            box-sizing: border-box;
            margin-bottom: 0;
            text-align: center;
          }

          .spacer {
            height: 300px;
          }
          .start-img-wrapp {
            position: absolute;
            bottom: 0;
            width: 300vw;
            height: 41.92vw;
            left: -100vw;
          }
          .start-back {
            height: 100%;
            width: 100%;
          }
          .start-back img {
            object-fit: cover;
            mix-blend-mode: overlay;
          }
          @media (min-width: 375px) {
            footer div.footer-nav {
              grid-template-columns: repeat(3, auto);
            }
            footer .links li a {
              padding: 8px 0;
            }
          }
          @media (min-width: 768px) {
            footer span {
              font-size: 24px;
              line-height: 24px;
            }
            footer {
              padding: 24px;
            }
            footer > * {
              display: grid;
              grid-gap: 24px;
              padding: 40px 0;
              text-align: left;
            }
            footer div.footer-nav {
              grid-template-columns: repeat(3, auto);
              grid-gap: 24px;
            }
            footer .socials ul {
              justify-content: flex-start;
            }
          }
          @media (min-width: 1025px) {
            footer {
              padding: 32px;
            }
            .gallery-wrapper {
              grid-template-columns: repeat(3, 1fr);
            }

            footer > * {
              display: grid;
              grid-template-columns: 1fr 3fr 1fr;
              grid-gap: 24px;
              padding: 40px 0;
            }
            footer div.footer-nav {
              padding: 0 24px;
              grid-gap: 16px;
            }
            .legal {
              height: 36px;
            }
          }
          @media (min-width: 1200px) {
            footer {
              padding: 48px;
            }
            footer > * {
              padding: 80px 0 40px;
            }
          }
          @media (min-width: 1600px) {
            footer {
              padding: 56px;
            }
          }
        `}
      </style>
    </>
  );
};

const List = ({ title, links, style }) => {
  return (
    <>
      <nav className={`links ${style}`}>
        <span>{title}</span>
        <ul style={{ marginTop: "8px" }}>
          {links.map((link) => (
            <li key={Math.random()}>
              <a href={link.link}>{link.text}</a>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .links li a {
          color: white;
          opacity: 0.6;
          display: block;
          box-sizing: border-box;
          padding: 4px 0;
          transition: 0.15s ease;
        }
        .links li a:hover {
          opacity: 1;
        }
        span {
          font-size: 18px;
          line-height: 18px;
          text-transform: uppercase;
          font-weight: 700;
        }
      `}</style>
    </>
  );
};

const Socials = ({ title, links }) => {
  return (
    <>
      <div className="socials">
        <span>{title}</span>
        <ul
          className="flex-align-center list-spacing-med"
          style={{ marginTop: "16px" }}
        >
          {links.map((link) => {
            let Icon = link.icon;
            return (
              <li
                key={Math.random()}
                className="flex-align-center  flex-justify-center"
              >
                <a href={link.link}>
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        li a {
          opacity: 0.6;
          display: block;
          box-sizing: border-box;
          padding: 4px 0;
          transition: 0.15s ease;
        }
        span {
          font-size: 18px;
          line-height: 18px;
          text-transform: uppercase;
          font-weight: 700;
        }
        li a:hover {
          opacity: 1;
        }
        .socials ul {
          justify-content: center;
        }

        .socials li {
          height: 36px;
          width: 36px;
          border-radius: 100%;
          background: #33363d;
          transition: 0.15s ease;
        }
        .socials li svg {
          display: block;
        }

        .socials li:hover {
          background: white;
        }
        .socials li:hover svg path {
          fill: #1d2028;
        }
        a {
          color: #ffffff60;
        }
        a:hover {
          color: #ffffff;
        }
      `}</style>
    </>
  );
};

export default Footer;
