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
  const [bnb, setBnb] = useState(true);

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
        <div>
          <span style={{ opacity: 0.6 }}>I would like to deposit:</span>
          <div className="options-wrapper flex-align-center flex-justify-btw">
            <div className="slider" />
            <div
              onClick={() => setBnb(true)}
              className="option flex-align-center flex-justify-center"
            >
              BNB
            </div>
            <div
              onClick={() => setBnb(false)}
              className="option flex-align-center flex-justify-center"
            >
              IOM
            </div>
          </div>
        </div>
        <div className="code-wrapper">
          <QRCode value={code} />
        </div>
        <div>
          <div className=" address-wrapper flex-align-center flex-justify-center list-spacing-sml">
            <p>
              <span className="deposit-text"></span> <b>{code}</b>
            </p>
            <button className="icon" onClick={() => copyCode()}>
              <Copy />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider {
          position: absolute;
          background: ${bnb ? "#F0B90B" : "#ff4544"};
          border-radius: 0.5rem;
          height: 40px;
          width: 50%;
          z-index: 0;
          top: 0;
          left: ${bnb ? "0" : "50%"};
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .option {
          width: 100%;
          height: 40px;
          font-size: 20px;
          border-radius: 0.5rem;
          position: relative;
          z-index: 1;
          background: #ffffff00;
          font-weight: 600;
          cursor: pointer;
          padding-bottom: 4px;
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .options-wrapper {
          position: relative;
          overflow: none;
          margin-top: 0.5rem;
          height: 40px;
          border-radius: 0.5rem;
          background: #ffffff10;
        }
        .option:hover {
          background: #ffffff10;
        }
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
          padding: 24px;
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
      `}</style>
    </>
  );
}
