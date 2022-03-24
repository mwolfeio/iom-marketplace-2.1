import fetchJson, { FetchError } from "lib/fetchJson";

import Layout from "components/Layout";
import Image from "next/image";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [errorMsg, setErrorMsg] = useState("");
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  useEffect(() => {
    getOffers();
  }, []);

  const getOffers = async (
    page = 0,
    size = 30,
    sortAttributeName,
    sortMode,
    tokenGames,
    priceFrom,
    priceTo
  ) => {
    try {
      const { rows, pages } = await fetchJson("/api/NftOffers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: page,
          size: size,
          sortAttributeName: sortAttributeName,
          sortMode: sortMode,
          tokenGames: tokenGames,
          priceFrom: priceFrom,
          priceTo: priceTo,
        }),
      });
      setOffers(rows);
      setPageCount(pages);
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  return (
    <Layout>
      <h1>NFT Marketplace</h1>

      {errorMsg ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <pre>{JSON.stringify(offers, null, 2)}</pre>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  );
}
