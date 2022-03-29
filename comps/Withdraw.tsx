// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";
import FormWrapper from "comps/FormWrapper";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";

export default function Comp({ arr, hook }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [iom, setIom] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user && user.isLoggedIn)
      setIom(user.balances.find((o) => o.token === "IOM").amount);
  }, [user]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Address Coppied");
  };

  return (
    <div className="login">
      <FormWrapper
        errorMessage={error}
        onSubmit={async function handleSubmit(event) {
          event.preventDefault();
          setLoading(true);
          console.log("payload: ", {
            token: "IOM",
            amount: withdraw,
            walletAddress: address,
          });

          console.log("header: ", {
            headers: { Authorization: user.token },
          });

          try {
            //submit withdraw
            const { data } = await axios.post(
              "https://api.apiiom.com/bank/withdrawal",
              {
                token: "IOM",
                amount: withdraw,
                walletAddress: address,
              },
              {
                headers: { Authorization: user.token },
              }
            );

            //update user balance
            //  mutate user data

            //clear inputs
            setWithdraw(0);
            setError("");
            setAddress("");

            hook([data]);
            toast.success(`Withdraw successful!`);
          } catch (error) {
            console.log("Error: ", error.response);
            setError(
              `Error: ${error.response ? error.response.data.message : error}`
            );
          }
          setLoading(false);
        }}
      >
        <h1 style={{ margin: 0 }}>Withdraw IOM</h1>
        <p>
          Enter the amount and the IOM address you would like to withdraw funds
          to.
        </p>

        <label>
          <div className="flex-justify-btw" style={{ margin: ".5rem 0" }}>
            <span>
              <b>Destination:</b>
            </span>
            <span style={{ opacity: 0.6 }}>IOM Address</span>
          </div>
          <input
            type="address"
            name="address"
            onChange={() => setAddress(event.target.value)}
            value={address}
            placeholder="Address..."
            required
          />
        </label>
        <label>
          <div className="flex-justify-btw" style={{ margin: ".5rem 0" }}>
            <span>
              <b>Amount:</b>
            </span>
            <span style={{ opacity: 0.6 }}>Max: {iom}</span>
          </div>
          <div id="withdraw-input">
            <input
              type="number"
              step="any"
              name="withdraw"
              placeholder="Withdraw amount..."
              min={0}
              max={iom}
              onChange={() =>
                setWithdraw(Math.max(0, Math.min(iom, event.target.value)))
              }
              value={withdraw}
              required
            />
          </div>
        </label>

        <div className="withdraw-buttons flex-justify-btw">
          <div onClick={() => setWithdraw(Math.round(iom * 0.25))}>25%</div>
          <div onClick={() => setWithdraw(Math.round(iom * 0.5))}>50%</div>
          <div onClick={() => setWithdraw(Math.round(iom * 0.75))}>75%</div>
          <div onClick={() => setWithdraw(iom)}>100%</div>
        </div>
        <label>
          <input
            style={{ padding: "8px 0" }}
            type="range"
            name="amount"
            onChange={() => setWithdraw(event.target.value)}
            value={withdraw}
            min="0"
            max={iom}
            required
          />
          <div className="flex-justify-btw" style={{ margin: "0 0 .5rem 0" }}>
            <span>0 IOM</span>
            <span>{iom} IOM</span>
          </div>
        </label>
        <button className="primary">{loading ? <Loader /> : "Withdraw"}</button>
      </FormWrapper>

      <style jsx>{`
        p {
          opacity: 0.8;
        }
        .login {
          margin: 0 auto;
          background: #1d2028;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 24px;
          width: Calc(100vw - 32px);
          max-width: 360px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 4px rgb(0 0 0 / 2%);
        }
        .withdraw-buttons > * {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-family: inherit;
          border-color: rgba(226, 232, 240);
          color: #fff;
          line-height: 1.25;
          padding: 0.5rem 0.75rem;
          border-width: 1px;
          border: none;
          outline: none;
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
          font-size: 1rem;
          background: #33363d;
        }
        .withdraw-buttons > *:hover {
          background: #ffffff30;
        }
        .withdraw-buttons > *:first-child {
          border-radius: 0.25rem 0 0 0.25rem;
        }

        .withdraw-buttons > *:last-child {
          border-radius: 0 0.25rem 0.25rem 0;
        }
        #withdraw-input {
          position: relative;
        }
        #withdraw-input::after {
          content: "IOM";
          display: block;
          position: absolute;
          right: 0.5rem;
          bottom: 6px;
        }

        #withdraw-input:hover::after,
        #withdraw-input:focus-within::after {
          right: 2rem;
        }
      `}</style>
    </div>
  );
}
