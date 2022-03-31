// @ts-nocheck
import React, { useState } from "react";
import GalleryPage from "comps/GalleryPage";

import Img from "assets/media/thumbnail.png";

//comps
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Influencers of the Metaverse — Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta
          name="title"
          content="Influencers of the Metaverse  — Marketplace"
        />
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
      <GalleryPage
        sideNav={true}
        title="Marketplace"
        defaults={{ tokenCategories: ["CHAR"] }}
        placeholder="No Characters"
      />
    </>
  );
}
