// @ts-nocheck
import React, { useState } from "react";
import { FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";

import Link from "next/link";
import Loader from "comps/Loader";

export default function Form() {
  const [error, setError] = useState("");
  const [sub, setSub] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(false);

  //Get comfirmation code----------
  const submitEmail = async () => {
    setLoading(true);
    console.log("running submit email: ", email);

    try {
      await axios.post(
        "https://api.apiiom.com/user/password-recovery/request",
        {
          userEmail: email,
        }
      );
      setSub(true);
      setError(false);
      toast.success("Email sent!");
    } catch (error) {
      console.log("error raw ", error);
      console.log("Error: ", error.response);
      if (error.response) setError(`Error: ${error.response.data.message}`);
    }
    setLoading(false);
  };
  //variy email--------------------
  const sumbitNewPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://api.apiiom.com/user/password-recovery/submit", {
        userEmail: email,
        code: code,
        newPassword: pass,
      });

      toast.success("Password Changed!");
      // submit-----------------------
      setError(false);
      Router.push("/login");
    } catch (error) {
      console.log("raw error: ", error);
      if (error.response) setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(event) => sumbitNewPassword(event)}
      className="vert-space-sml"
    >
      <h1 style={{ margin: 0 }}>{sub ? "New Password" : "Reset Password"}</h1>
      <p style={{ padding: ".5rem 0" }}>
        {sub
          ? "Enter your confirmation code and Create a new password."
          : "Forgot your password? No problem. Enter your email address."}
      </p>

      <p></p>
      {sub ? (
        <>
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
          <label>
            <input
              type="password"
              name="password"
              placeholder="New password..."
              onChange={() => setPass(event.target.value)}
              value={pass}
              required
            />
          </label>
        </>
      ) : (
        <>
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
        </>
      )}

      <div
        className="form-button-wapper flex-align-center list-spacing-sml"
        style={{ paddingTop: ".5rem" }}
      >
        <Link href="/login">
          <a>
            <button type="button">Back</button>
          </a>
        </Link>
        {sub ? (
          <button type="submit" className="primary">
            {loading ? <Loader /> : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => submitEmail()}
            className="primary"
          >
            {loading ? <Loader /> : "Confirm email"}
          </button>
        )}
      </div>
      {error && <p className="error-wrapper">⛔ {error}</p>}
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
      `}</style>
    </form>
  );
}
