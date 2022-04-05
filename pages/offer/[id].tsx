// @ts-nocheck
import React from "react";
import { useRouter } from "next/router";

import Layout from "comps/Layout";
import Offer from "comps/Offer";
import Img from "assets/media/thumbnail.png";
import Head from "next/head";

export default function SgProfile() {
  let router = useRouter();

  console.log("router.query.id:  ", router.query.id);

  return (
    <Layout>
      <Head>
        <title>IOM — Offer: {router.query.id}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
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
      <Offer id={router.query.id} nftId="1234" hideHeader={true} />
    </Layout>
  );
}
