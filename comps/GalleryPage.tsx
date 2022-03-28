// @ts-nocheck
import React, { useState, useEffect } from "react";
import fetchJson, { FetchError } from "lib/fetchJson";

import Layout from "comps/Layout";
import Image from "next/image";
import Gallery from "comps/Gallery";
import Pagination from "comps/Pagination";

const filter = [
  {
    type: "pop",
    key: "sortAttributeName",
    lable: "",
  },
  {
    type: "slider",
  },
  { type: "div" },
  {
    type: "drop",
    lable: "Game",
    options: [
      {
        key: "All Games",
        value: "",
      },
      {
        key: "Skyzao",
        value: "SKYZAO",
      },
    ],
  },
  { type: "div" },
];

export default function GalleryPage({ defaults, placeholder, title, sideNav }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    getOffers(defaults);
  }, []);

  //https://api.apiiom.com/store/offer?tokenGames=ALL,SKYZAO&priceFrom=0&priceTo=10000&size=10&page=0&tokenCategories=CHAR,GAME_ITEM
  const getOffers = async (body) => {
    setLoading(true);
    try {
      console.log("fetching offers");

      const { rows, pages } = await fetchJson("/api/GetOffers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setOffers(rows);
      setPageCount(pages);
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else console.error("An unexpected error happened:", error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      {errorMsg ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <>
          <Gallery
            title={title}
            filter={filter}
            sideNav={sideNav}
            data={offers}
            hook={getOffers}
            loading={loading}
            placeholder={placeholder}
          />
          <Pagination />
        </>
      )}

      <style jsx>{``}</style>
    </Layout>
  );
}
