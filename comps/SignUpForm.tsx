// @ts-nocheck
import React, { useState } from "react";
import { FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Link from "next/link";
import Loader from "comps/Loader";

export default function Form({
  errorMessage,
  onSubmit,
  children,
}: {
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const [error, setError] = useState("");
  const [sub, setSub] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(false);

  //Get comfirmation code----------
  const submitEmail = async () => {
    setLoading(true);
    try {
      await axios.post("https://api.apiiom.com/user", {
        email: email,
        username: username,
        password: pass,
        referralId: refCode,
      });
      setSub(true);
      setError(false);
      toast.success("Email sent!");
    } catch (error) {
      console.log("error raw ", error);

      console.log("Error: ", error.response);
      if (error.response) setError(error.response.data.message);
    }
    setLoading(false);
  };
  //variy email--------------------
  const signIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log("pahyload: ", {
        userEmail: email,
        code: code,
      });

      await axios.post("https://api.apiiom.com/user/verify", {
        userEmail: email,
        code: code,
      });

      toast.success("Email Verified!");
      // submit-----------------------
      setError(false);
      console.log("signing in");

      onSubmit(email, pass);
    } catch (error) {
      console.log("raw error: ", error);

      console.log("Error: ", error.response);
      if (error.response) setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={(event) => signIn(event)} className="vert-space-sml">
      <h1 style={{ margin: 0 }}>{sub ? "Verify your Email" : "Sign up"}</h1>
      <p style={{ padding: ".5rem 0 " }}>
        {sub
          ? "We sent a verificaiton code to your email. Please add the code below."
          : "After signing up, you will receive an email with a verification code."}
      </p>
      {sub ? (
        <label>
          <input
            type="text"
            name="code"
            placeholder="Confirmation code..."
            onChange={() => setCode(event.target.value)}
            value={code}
            required
          />
        </label>
      ) : (
        <>
          <label>
            <input
              type="text"
              name="username"
              onChange={() => setUsername(event.target.value)}
              value={username}
              placeholder="Username..."
              required
            />
          </label>
          <label>
            <input
              type="email"
              name="email"
              onChange={() => setEmail(event.target.value)}
              value={email}
              placeholder="Email..."
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              onChange={() => setPass(event.target.value)}
              value={pass}
              placeholder="Password..."
              required
            />
          </label>
          {true ? (
            ""
          ) : (
            <label>
              <input
                type="text"
                name="referral"
                onChange={() => setRefCode(event.target.value)}
                value={refCode}
                placeholder="Referral code..."
                required
              />
            </label>
          )}
        </>
      )}

      <div
        className="form-button-wapper flex-align-center list-spacing-sml"
        style={{ paddingTop: ".5rem" }}
      >
        <Link href="/login">
          <a>
            <button type="button">Sign in</button>
          </a>
        </Link>
        {sub ? (
          <button type="submit" className="primary">
            {loading ? <Loader /> : "Sign up"}
          </button>
        ) : (
          <button
            type="button"
            className="primary"
            onClick={() => submitEmail()}
          >
            {loading ? <Loader /> : "Confirm email"}
          </button>
        )}
      </div>
      {(errorMessage || error) && (
        <p className="error-wrapper">
          ⛔ {errorMessage ? errorMessage : error}
        </p>
      )}
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        .form-button-wapper {
          width: 100%;
        }
        .form-button-wapper > *,
        .form-button-wapper button {
          display: block;
          width: 100%;
        }
        .error-wrapper {
          color: red;
          line-height: 1.25;
          padding: 0.5rem 0.75rem;
          border-width: 1px;
          border-radius: 0.25rem;
          outline-offset: -2px;
          margin-bottom: 0.5rem;
          border: 1px solid red;
          min-height: 38px;
          background: rgba(255, 0, 0, 0.1);
          outline: none;
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
          font-size: 1rem;
          width: 100%;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}
