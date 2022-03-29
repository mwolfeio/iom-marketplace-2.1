// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";

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
        <p>Send you IOM deposits to the address listed below:</p>
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
