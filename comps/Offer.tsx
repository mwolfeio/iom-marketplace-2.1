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
import Loader from "comps/Loader";

export default function Offer({ id, userId, nftId, asset }) {
  const { user } = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState();
  // const [offer, setOffer] = useState();

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
          <PurchaseOffer
            offer={offer}
            user={user}
            id={id}
            setErrorMsg={setErrorMsg}
          />
          {errorMsg && <p className="error-wrapper">⛔ {errorMsg}</p>}

          <pre>{JSON.stringify(offer, null, 2)}</pre>

          <Asset data={offer} />
        </>
      ) : (
        <p>No offer found</p>
      )}
    </div>
  );
}

const PurchaseOffer = ({ offer, user, id, setErrorMsg }) => {
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
      amount: event.currentTarget.quantity.value,
    });

    try {
      console.log("user balance before: ", user.balances);

      //prchase offer
      await axios.post(
        "https://api.apiiom.com/store/buyOffer",
        {
          offerId: id,
          amount: event.currentTarget.quantity.value,
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

      console.log("user updated: ", data);

      //show toast
      toast.success(`Item purchased!`);

      //close offer and refresh page
      // router.back();
      router.push("/wallet");
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
