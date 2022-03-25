import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "lib/fetchJson";

import Asset from "comps/Asset";
import Loader from "comps/Loader";

export default function Offer({ id, userId, nftId }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState();
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    getOffer(id);
  }, []);

  const getOffer = async (id) => {
    setLoading(true);
    try {
      console.log("fetching offer");
      const res = await fetchJson("/api/GetOffer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      setOffer(res);
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <h1>Offer</h1>
          <pre>{JSON.stringify(offer, null, 2)}</pre>
          <Asset id={nftId} />
        </>
      )}
    </div>
  );
}
