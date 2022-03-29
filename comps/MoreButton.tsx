// @ts-nocheck
import React, { useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";

import useUser from "lib/useUser";

//comps
import Icon from "assets/icons/Search";
import Dots from "assets/icons/Dots";

const Comp = ({}) => {
  const [expanded, setExpanded] = useState(false);
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const descRef = useRef();

  function expand() {
    setExpanded(true);
  }

  function close() {
    setExpanded(false);
  }

  function select(value) {
    close();
    descRef.current.blur();
  }

  const signOut = async (e) => {
    e.preventDefault();
    mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
    router.push("/login");
  };
  const options = [
    {
      name: "Deposit IOM",
      hook: (e) => {
        router.push("/wallet/deposit");
      },
    },
    {
      name: "Withdraw IOM",
      hook: () => router.push("/wallet/withdraw"),
    },
    {
      name: "Buy IOM",
      hook: () => window.open("https://pancakeswap.finance/swap", "_newtab"),
    },
    { name: "Sign Out", hook: signOut },
  ];

  return (
    <div
      style={{ position: "relative" }}
      ref={descRef}
      onFocus={expand}
      onBlur={close}
      tabIndex={0}
    >
      <button className="icon">
        <Dots />
      </button>

      <ul className={`more-drop ${expanded && "active"}`}>
        {options.map(({ name, hook }, i) => (
          <li
            onClick={(e) => {
              hook(e);
              close();
            }}
            className="flex-align-center"
          >
            {name}
          </li>
        ))}
      </ul>

      <style jsx>{`
        ul.more-drop {
          z-index: 50;
          opacity: 0;
          height: 0;
          overflow: hidden;
          position: absolute;
          top: Calc(100% + 8px);
          right: 0;
          width: 160px;
          padding: 0.5rem;
          border-radius: 1rem;
          background: white;
          animation: drop-down 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        ul.more-drop.active {
          opacity: 1;
          height: auto;
          overflow: visible;
        }
        ul.more-drop li {
          border-radius: 0.5rem;
          height: 40px;
          color: #1d2028;
          text-align: left;
          padding: 0.5rem;
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
          cursor: pointer;
        }
        ul.more-drop li:hover {
          background: #1d202810;
          color: #3772ff;
        }
      `}</style>
    </div>
  );
};
export default Comp;
