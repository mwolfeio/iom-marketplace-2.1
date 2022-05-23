// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";
import FormWrapper from "comps/FormWrapper";
import ethereum_address from "ethereum-address";
import { UserContext } from "lib/UserContext";
import { useRouter } from "next/router";

import fetchJson from "lib/fetchJson";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";

function numberWithCommas(x) {
  let str = x.toString();
  let strArr = str.toString().split(".");
  strArr[0] = strArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return strArr.join(".");
}

export default function Comp({ arr, hook }) {
  const { user, mutateUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [withdraw, setWithdraw] = useState(0);
  const [fee, setFee] = useState(0);
  const [address, setAddress] = useState("");
  const { newUser, refreshUSer } = useContext(UserContext);
  const router = useRouter();

  const [usebnb, setuseBnb] = useState(false);
  const [iomBalance, setIomBalance] = useState(0);
  const [bnbBalance, setBnbBalance] = useState(0);

  const [iom, setIom] = useState(0);

  useEffect(() => {
    if (user && user.isLoggedIn) {
      let iomBal = user.balances.filter((obj) => obj.token === "IOM")[0];
      let bnbBal = user.balances.filter((obj) => obj.token === "BNB")[0];
      getFee();
      setIomBalance(iomBal ? iomBal.amount : 0);
      setBnbBalance(bnbBal ? bnbBal.amount : 0);
    }
  }, [user]);

  const getFee = async () => {
    console.log("running get fee");

    try {
      const { data } = await axios.get(
        "https://apiiom.algopro.com.br/bank/withdrawals/fee",
        {
          headers: { Authorization: user.token },
        }
      );

      setFee(data / 100);
      setError("");

      //refresh user
      refreshUSer();

      //clear inputs
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
          router.push("/login");
        }
        console.error("Error:", error.response.data);
        setError(error.response.data.message);
      } else console.error("An unexpected error happened:", error);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <FormWrapper
        errorMessage={error}
        onSubmit={async function handleSubmit(event) {
          event.preventDefault();
          if (usebnb) return;
          setLoading(true);

          try {
            //submit withdraw
            const { data } = await axios.post(
              "https://api.apiiom.com/bank/withdrawal",
              {
                token: usebnb ? "BNB" : "IOM",
                amount: withdraw,
                walletAddress: address,
              },
              {
                headers: { Authorization: user.token },
              }
            );

            //clear inputs
            setWithdraw(0);
            setError("");
            setAddress("");

            hook([data]);
            toast.success(`Withdraw successful!`);
          } catch (error) {
            if (error.response) {
              if (error.response.status === 401) {
                mutateUser(
                  await fetchJson("/api/logout", { method: "POST" }),
                  false
                );
                router.push("/login");
              }
              console.error("Error:", error.response.data);
              setError(error.response.data.message);
            } else console.error("An unexpected error happened:", error);
          }
          setLoading(false);
        }}
      >
        <h1 style={{ margin: 0 }}>Withdraw</h1>
        <p>
          Enter the amount and destination address of the token you would like
          to withdraw.
        </p>
        <div>
          <span style={{ opacity: 0.6 }}>I would like to withdraw:</span>
          <div className="options-wrapper flex-align-center flex-justify-btw">
            <div className="slider" />
            <div
              onClick={() => {
                setuseBnb(true);
                setWithdraw(0);
              }}
              className="option flex-align-center flex-justify-center"
            >
              BNB
            </div>
            <div
              onClick={() => {
                setuseBnb(false);
                setWithdraw(0);
              }}
              className="option flex-align-center flex-justify-center"
            >
              IOM
            </div>
          </div>
        </div>

        <label>
          <div className="flex-justify-btw" style={{ margin: ".5rem 0" }}>
            <span>
              <b>Destination:</b>
            </span>
            <span style={{ opacity: 0.6 }}>
              {usebnb ? "BNB" : "IOM"} Address
            </span>
          </div>
          <input
            className={
              !address
                ? ""
                : ethereum_address.isAddress(address)
                ? "good"
                : "warning"
            }
            type="address"
            name="address"
            onChange={() => setAddress(event.target.value)}
            value={address}
            placeholder="Address..."
            required
            style={{
              marginBottom:
                address && ethereum_address.isAddress(address) ? ".5rem" : "",
            }}
          />
          {address &&
            (ethereum_address.isAddress(address) ? (
              <p>✅ Valid BSC address</p>
            ) : (
              <p>⚠️ This is not a valid BSC address</p>
            ))}
        </label>
        <label>
          <div className="flex-justify-btw" style={{ margin: ".5rem 0" }}>
            <span>
              <b>Amount:</b>
            </span>
            <span style={{ opacity: 0.6 }}>
              Max: {usebnb ? bnbBalance : iomBalance}
            </span>
          </div>
          <div id="withdraw-input">
            <input
              type="number"
              step="any"
              name="withdraw"
              placeholder="Withdraw amount..."
              min={0}
              onChange={() =>
                setWithdraw(
                  Math.max(
                    0,
                    Math.min(
                      usebnb ? bnbBalance : iomBalance,
                      event.target.value
                    )
                  )
                )
              }
              value={withdraw}
              required
            />
          </div>
        </label>

        <div className="withdraw-buttons flex-justify-btw">
          <div
            onClick={() =>
              setWithdraw((usebnb ? bnbBalance : iomBalance) * 0.25)
            }
          >
            25%
          </div>
          <div
            onClick={() =>
              setWithdraw((usebnb ? bnbBalance : iomBalance) * 0.5)
            }
          >
            50%
          </div>
          <div
            onClick={() =>
              setWithdraw((usebnb ? bnbBalance : iomBalance) * 0.75)
            }
          >
            75%
          </div>
          <div onClick={() => setWithdraw(usebnb ? bnbBalance : iomBalance)}>
            100%
          </div>
        </div>
        <label>
          <input
            style={{ padding: "8px 0" }}
            type="range"
            name="amount"
            onChange={() => setWithdraw(event.target.value)}
            value={withdraw}
            min="0"
            max={usebnb ? bnbBalance : iomBalance}
            required
          />
          <div className="flex-justify-btw" style={{ margin: "0 0 .5rem 0" }}>
            <span>0 {usebnb ? "BNB" : "IOM"}</span>
            <span>
              {usebnb ? bnbBalance : iomBalance} {usebnb ? "BNB" : "IOM"}
            </span>
          </div>
        </label>
        {usebnb ? (
          <p style={{ textAlign: "center" }}>
            BNB Withdraws are not supported yet
          </p>
        ) : null}
        <button className={usebnb ? "disabled" : "primary"} disabled={usebnb}>
          {loading ? (
            <Loader />
          ) : (
            <span>
              {withdraw > 0
                ? `Withdraw ${withdraw * (1 - fee)} ${usebnb ? "BNB" : "IOM"}`
                : "Withdraw"}
            </span>
          )}
        </button>
        <div className="flex-align-center flex-justify-btw text-stuff">
          <p>
            <span style={{ opacity: 0.6 }}>Total:</span>{" "}
            <b>{numberWithCommas(withdraw)}</b>
          </p>
          <p>
            <span style={{ opacity: 0.6 }}>Subtotal:</span>{" "}
            <b>{numberWithCommas(withdraw * (1 - fee))}</b>
          </p>
          <p>
            <span style={{ opacity: 0.6 }}>Fee:</span>{" "}
            <b>
              {numberWithCommas(withdraw * fee)} ({fee * 100}%)
            </b>
          </p>
        </div>
      </FormWrapper>

      <style jsx>{`
        .slider {
          position: absolute;
          background: ${usebnb ? "#F0B90B" : "#ff4544"};
          border-radius: 0.5rem;
          height: 40px;
          width: 50%;
          z-index: 0;
          top: 0;
          left: ${usebnb ? "0" : "50%"};
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

        .text-stuff {
          text-align: center;
        }
        input.good {
          border: 2px solid #219653;
          background: #21965310;
        }
        input.warning {
          border: 2px solid #f2c94c;
          background: #f2c94c10;
        }
        p {
          opacity: 0.8;
        }
        .login {
          margin: 0 auto 24px;
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
          content: "${usebnb ? "BNB" : "IOM"}";
          display: block;
          position: absolute;
          right: 0.5rem;
          bottom: 6px;
        }


      `}</style>
    </div>
  );
}
