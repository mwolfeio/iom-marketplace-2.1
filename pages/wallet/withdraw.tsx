// @ts-nocheck
import React, { useState } from "react";
import Router from "next/router";

import Layout from "comps/Layout";
import Withdraw from "comps/Withdraw";
import Img from "assets/media/thumbnail.png";
import History from "comps/WithdrawtHistory";
import BreadCrumbs from "comps/BreadCrumbs";
import Head from "next/head";

export default function Comp() {
  const [newWith, setNewWith] = useState([]);
  return (
    <Layout>
      <Head>
        <title>IOM — Withdraw</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="title" content="IOM — Withdraw" />
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
      <BreadCrumbs path={["wallet", "withdraw"]} />
      <Withdraw hook={setNewWith} />
      <History arr={newWith} />
    </Layout>
  );
}
