import React, { useState } from "react";

import Link from "next/link";

export default function Form() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  return (
    <>
      <label>
        <h1 style={{ margin: 0 }}>Reset Password</h1>
        <p>Forgot your password? No problem. Enter your email address.</p>
        <input type="email" name="email" placeholder="Email..." required />
      </label>
      <div className="form-button-wapper flex-align-center list-spacing-sml">
        <Link href="/login">
          <a>
            <button type="button">Back</button>
          </a>
        </Link>
        <button type="submit" className="primary">
          Send email
        </button>
      </div>
      <style jsx>{`
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
    </>
  );
}
