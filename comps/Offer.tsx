import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/router";
// import fetchJson, { FetchError } from "lib/fetchJson";

import Asset from "comps/Asset";
import Loader from "comps/Loader";

export default function Offer({ id, userId, nftId, asset }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState();

  useEffect(() => {
    // console.log("getting offer iwth id: ", id);

    if (id) getOffer(id);
  }, [id]);

  const getOffer = async (id) => {
    setLoading(true);
    try {
      console.log("fetching offer");
      const { data } = await axios.get(
        `https://api.apiiom.com/store/offer/${id}`
      );
      setOffer(data);
    } catch ({ response }) {
      if (response) {
        setErrorMsg(response.data.message);
      } else {
        console.error("An unexpected error happened:", response);
      }
    }
    setLoading(false);
  };

  //If the offer's user ID = this Users Id then add
  //the edit controlls

  return (
    <div>
      <h1>Offer</h1>
      {loading && <Loader />}
      {!loading && offer ? (
        <>
          <pre>{JSON.stringify(offer, null, 2)}</pre>
          <Asset data={offer} />
        </>
      ) : (
        <p>No offer found</p>
      )}
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}

// offer
//   if offer exists show offer
//   if use ID = ownerId show edit buttons
//   if no offer but ID = ownerId then show create buttons
//
// Asset
//   if aset exists show asset
//   if asset does not exist show 404 error
