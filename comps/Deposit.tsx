// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";

import { QRCode } from "react-qrcode-logo";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";

export default function Comp({ data }) {
  const { user } = useUser();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  const getAddress = async () => {
    setLoading(true);
    console.log("user token: ", user.token);

    try {
      const {
        data: { address },
      } = await axios.get("https://api.apiiom.com/bank/wallet/IOM/address", {
        headers: { Authorization: user.token },
      });
      console.log("address:", address);

      setCode(address);
    } catch (error) {
      console.log("Error: ", error);
      if (error.response) setError(error.response.data.message);
    }
    setLoading(false);
  };
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Address Coppied");
  };

  if (loading) return <Loader />;
  return (
    <>
      <div className="login vert-space-med">
        <h1 style={{ margin: 0 }}>Deposits</h1>
        <p>Send your IOM deposits to the address listed below:</p>
        <div className="code-wrapper">
          <QRCode value={code} />
        </div>
        <div>
          <div className=" address-wrapper flex-align-center flex-justify-center list-spacing-sml">
            <p
              style={{
                wordWrap: "break-word",
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                maxWidth: "Calc(100vw - 92px)",
              }}
            >
              <b>{code}</b>
            </p>
            <button className="icon mobile-hide" onClick={() => copyCode()}>
              <Copy />
            </button>
          </div>
          <button
            style={{ margin: ".5rem auto 0" }}
            className="icon-text desktop-hide "
            onClick={() => copyCode()}
          >
            <div style={{ marginRight: ".5rem" }}>
              <Copy />
            </div>
            Copy Address
          </button>
        </div>
      </div>
      <style jsx>{`
        .code-wrapper {
          margin: 1rem auto;
          border-radius: 1rem;

          overflow: hidden;
        }
        .code-wrapper > * {
          display: block;
        }
        .login {
          margin: 0 auto;
          background: #1d2028;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 1rem;
          width: fit-content;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 4px rgb(0 0 0 / 2%);
        }
        .address-wrapper {
          background: #ffffff10;
          border-radius: 0.5rem;
          padding: 0.5rem;
          width: 100%;
        }
        .deposit-text {
          opacity: 0.8;
        }
        @media (min-width: 768px) {
          .login {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
