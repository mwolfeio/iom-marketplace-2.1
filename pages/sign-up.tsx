// @ts-nocheck
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Img from "assets/media/thumbnail.png";

import useUser from "lib/useUser";
import Layout from "comps/Layout";
import FormWrapper from "comps/FormWrapper";
import SignUpForm from "comps/SignUpForm";
import fetchJson, { FetchError } from "lib/fetchJson";
import Head from "next/head";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/wallet",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  return (
    <>
      <Head>
        <title>IOM — Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="title" content="IOM — Sign Up" />
        <meta
          name="description"
          content="The official NFT, in-game item and boxes marketplace for all Influencers of the Metaverse games! Check out all the crazy characters and fun Blochian based games."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="Influencers of the Metaverse  — Marketplace"
        />
        <meta
          property="og:description"
          content="The official NFT, in-game item and boxes marketplace for all Influencers of the Metaverse games! Check out all the crazy characters and fun Blochian based games."
        />
        <meta property="og:image" content={Img} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="Influencers of the Metaverse  — Marketplace"
        />
        <meta
          property="twitter:description"
          content="The official NFT, in-game item and boxes marketplace for all Influencers of the Metaverse games! Check out all the crazy characters and fun Blochian based games."
        />
        <meta property="twitter:image" content={Img} />
      </Head>
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
                router.push("/wallet");
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
    </>
  );
}
