// @ts-nocheck
import React, { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import fetchJson from "lib/fetchJson";

// import type { User } from "api/user";
// import fetchJson, { FetchError } from "lib/fetchJson";

import Asset from "comps/Asset";
import AssetCarosel from "comps/AssetCarosel";
import Loader from "comps/Loader";

export default function Offer({
  id,
  userId,
  nftId,
  asset,
  href,
  onClose,
  refresh,
}) {
  const { user } = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState();
  const [simlar, setSimilar] = useState();
  // const [offer, setOffer] = useState();

  useEffect(() => {
    // console.log("getting offer iwth id: ", id);

    if (id) hydratePage(id);
  }, [id]);

  const hydratePage = async (id) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const o = await getOffer(id);
      await getSimilar(o);
    } catch (err) {
      console.error("An unexpected error happened:", err);
    }
    setLoading(false);
  };
  const getOffer = async (id) => {
    try {
      console.log("fetching offer");
      const { data } = await axios.get(
        `https://api.apiiom.com/store/offer/${id}`
      );
      setOffer(data);
      return data;
    } catch ({ response }) {
      if (response) {
        setErrorMsg(response.data.message);
      } else {
        console.error("An unexpected error happened:", response);
      }
    }
  };
  const getSimilar = async (o) => {
    try {
      console.log("fetching similar products");
      console.log("offer: ", o);
      console.log(
        `https://api.apiiom.com/store/offer?page=0&size=4&tokenCategories=${o.tokenCategory}`
      );

      const {
        data: { rows, pages },
      } = await axios.get(
        `https://api.apiiom.com/store/offer?page=0&size=4&tokenCategories=${o.tokenCategory}`
      );
      console.log("rows: ", rows);

      setSimilar(rows);
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else console.error("An unexpected error happened:", error);
    }
  };

  //If the offer's user ID = this Users Id then add
  //the edit controlls

  return (
    <div>
      {loading && <Loader />}
      {!loading && offer ? (
        <>
          <Asset
            data={offer}
            onClose={onClose}
            path={router.pathname.replace("/", "")}
          >
            <>
              <PurchaseOffer
                href={href}
                offer={offer}
                user={user}
                id={id}
                setErrorMsg={setErrorMsg}
                refresh={refresh}
              />
              {errorMsg && <p className="error-wrapper">⛔ {errorMsg}</p>}
            </>
          </Asset>

          <AssetCarosel slides={simlar} />
        </>
      ) : (
        <p>No offer found</p>
      )}
    </div>
  );
}

const PurchaseOffer = ({ offer, user, id, setErrorMsg, href, refresh }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutateUser } = useUser({
    redirectTo: "",
    redirectIfFound: false,
  });

  const purchaseOffer = async (event) => {
    event.preventDefault();
    console.log("purchasing product");

    //if not logged in redirect
    if (!user.isLoggedIn) return router.push("/login");
    setLoading(true);
    setErrorMsg("");
    console.log("payload: ", {
      offerId: id,
      amount:
        offer.tokenType === "FUNGIBLE" ? event.currentTarget.quantity.value : 1,
    });

    try {
      console.log("user balance before: ", user.balances);

      //prchase offer
      await axios.post(
        "https://api.apiiom.com/store/buyOffer",
        {
          offerId: id,
          amount:
            offer.tokenType === "FUNGIBLE"
              ? event.currentTarget.quantity.value
              : 1,
        },
        {
          headers: { Authorization: user.token },
        }
      );
      console.log("item purchaesd");

      //add new asset to balance - refresh user
      // await refreshUser(user);
      const response = await fetch("/api/refreshUser", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      refresh();
      console.log("user updated: ", data);

      //show toast
      toast.success(`Item purchased!`);

      //close offer and refresh page
      // router.back();
      href ? router.push(href) : router.push("/wallet");
    } catch (error) {
      console.log("Error: ", error);
      if (error.response) setErrorMsg(`Error: ${error.response.data.message}`);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={(event) => purchaseOffer(event)}
      className="flex-align-center list-spacing-sml"
    >
      {offer.tokenType === "FUNGIBLE" && (
        <label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity..."
            required
          />
        </label>
      )}
      <button
        type="submit"
        className={`primary ${user.iom < offer.price && "disabled"}`}
        disabled={user.iom < offer.price}
      >
        {loading ? <Loader /> : "Purchase"}
      </button>
    </form>
  );
};
