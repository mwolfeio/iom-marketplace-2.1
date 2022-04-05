// @ts-nocheck
import React, { useState } from "react";
import Layout from "comps/Layout";
import ForgotForm from "comps/ForgotForm";
import Head from "next/head";
import Img from "assets/media/thumbnail.png";

export default function Login() {
  return (
    <>
      <Head>
        <title>IOM — Forgot Password</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="title" content="IOM — Forgot Password" />
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
      </Head>{" "}
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
    </>
  );
}
