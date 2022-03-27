// @ts-nocheck
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header({ text, icon }) {
  const [boxCount, setBoxCount] = useState(0);
  const Comp = icon;

  return (
    <>
      <Link href="/wallet">
        <a className="box-banner list-spacing-sml flex-align-center flex-justify-center">
          {icon && <Comp />} <span>{text}</span>
        </a>
      </Link>

      <style jsx>{`
        .box-banner {
          height: 32px;
          background: #ff4544;
          font-weight: 600;
          color: #fff;
        }
      `}</style>
    </>
  );
}
