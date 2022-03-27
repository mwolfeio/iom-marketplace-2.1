// @ts-nocheck
import React, { useState } from "react";
import toast from "react-hot-toast";

import useUser from "lib/useUser";
import Layout from "comps/Layout";
import FormWrapper from "comps/FormWrapper";
import SignUpForm from "comps/SignUpForm";
import fetchJson, { FetchError } from "lib/fetchJson";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/wallet",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <div className="login">
        <SignUpForm
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(email, password) {
            console.log("signing in");

            const body = {
              email: email,
              password: password,
            };

            try {
              mutateUser(
                await fetchJson("/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                })
              );
              toast.success(`Welcome Back!`);
            } catch (error) {
              console.log("Error logging in: ", error.response);

              if (error instanceof FetchError) {
                // setErrorMsg(error.response);
              } else {
                console.error("An unexpected error happened:", error);
              }
            }
          }}
        />
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
