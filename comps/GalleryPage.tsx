// @ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "comps/Layout";
import Image from "next/image";
import Gallery from "comps/Gallery";

import Bubble from "comps/Bubble";
import SideNav from "comps/SideNav";
import Filter from "assets/icons/Filter";
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
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(true);

  //query perams
  const [query, setQuery] = useState({
    page: 0,
    size: 30,
    sortAttributeName: "",
    sortMode: "",
    tokenGames: [],
    priceFrom: 0,
    priceTo: 0,
    tokenCategories: [],
  });

  useEffect(() => {
    console.log("DEFAULTS: ", defaults);
    const {
      page = 0,
      size = 30,
      sortAttributeName = "",
      sortMode = "",
      tokenGames = [],
      priceFrom = 0,
      priceTo = 0,
      tokenCategories = [],
    } = defaults;
    setQuery({
      page,
      size,
      sortAttributeName,
      sortMode,
      tokenGames,
      priceFrom,
      priceTo,
      tokenCategories,
    });
  }, [defaults]);

  useEffect(() => {
    getOffers();
  }, [JSON.stringify(query)]);

  //https://api.apiiom.com/store/offer?tokenGames=ALL,SKYZAO&priceFrom=0&priceTo=10000&size=10&page=0&tokenCategories=CHAR,GAME_ITEM
  const getOffers = async () => {
    const {
      page = 0,
      size = 30,
      sortAttributeName = "",
      sortMode = "",
      tokenGames = [],
      priceFrom = 0,
      priceTo = 0,
      tokenCategories = [],
    } = query;
    if (tokenCategories.length < 1) return;
    setLoading(true);

    try {
      console.log("fetching offers");
      const {
        data: { rows, totalPages },
      } = await axios.get(
        `https://api.apiiom.com/store/offer?size=${size}&page=${page}${
          tokenCategories.length
            ? `&tokenCategories=${tokenCategories.toString()}`
            : ""
        }${sortMode ? `&sortMode=${sortMode}` : ""}${
          tokenGames.length ? `&tokenGames=${tokenGames.toString()}` : ""
        }${priceFrom ? `&priceFrom=${priceFrom}` : ""}${
          priceTo ? `&priceTo=${priceTo} ` : ""
        }`
      );

      setOffers(rows);
      setPageCount(totalPages);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else console.error("An unexpected error happened:", error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      {errorMsg ? (
        <p className="error">{errorMsg}</p>
      ) : (
        <div className={`widget-wrapper ${sideNav && "active"}`}>
          {sideNav && <SideNav filter={filter} open={open} />}
          <div style={{ width: "100%" }}>
            <div
              className="flex-align-center flex-justify-btw"
              style={{ height: "50px" }}
            >
              {sideNav ? (
                <Bubble
                  active={open}
                  clickable={true}
                  hook={() => setOpen(!open)}
                >
                  <Filter />
                  <span>Filter</span>
                </Bubble>
              ) : (
                <h2>{title}</h2>
              )}

              <Bubble clickable={true}>All Games</Bubble>
            </div>
            <div>
              <Gallery
                title={title}
                filter={filter}
                sideNav={sideNav}
                data={offers}
                hook={getOffers}
                loading={loading}
                placeholder={placeholder}
              />
              <Pagination
                pageCount={pageCount}
                page={query.page}
                setPage={(newPage) => {
                  console.log("running set page with ", newPage);

                  let p = { ...query };
                  p.page = newPage;
                  console.log("new query = ", p);
                  setQuery(p);
                  // getOffers();
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .widget-wrapper {
          margin: 1rem 0;
        }
        .widget-wrapper.active {
          display: flex;
          align-items: felx-start;
        }
      `}</style>
    </Layout>
  );
}
