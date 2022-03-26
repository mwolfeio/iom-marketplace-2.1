import React, { useState } from "react";
import Layout from "comps/Layout";
import ForgotForm from "comps/ForgotForm";

export default function Login() {
  return (
    <Layout>
      <div className="login">
        <ForgotForm />
      </div>
      <style jsx>{`
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
      `}</style>
    </Layout>
  );
}
