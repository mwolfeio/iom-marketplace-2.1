import Link from "next/link";
import React, { useEffect, useState } from "react";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import fetchJson from "lib/fetchJson";

export default function Header() {
  const [boxCount, setBoxCount] = useState(0);
  const [iom, setIom] = useState(0);
  const { user, mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.isLoggedIn && user.balances) {
      setBoxCount(
        user.balances.filter((obj) => obj.token.indexOf("BOX") !== -1).length
      );
      setIom(user.balances.filter((obj) => obj.token === "IOM")[0].amount);
    }
  }, [user]);

  console.log("User: ", user);

  return (
    <>
      {boxCount > 0 ? (
        <Link href="/wallet">
          <a className="box-banner flex-align-center flex-justify-center">
            You have {boxCount} Box{boxCount > 1 && "es"} to Open!
          </a>
        </Link>
      ) : (
        ""
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
                <li>
                  <Link href="/wallet">
                    <a>
                      <span>{iom} $IOM </span> <span> Wallet</span>
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
        .box-banner {
          height: 32px;
          background: #ff4544;
          font-weight: 600;
          color: #fff;
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
