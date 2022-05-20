// @ts-nocheck
import React, { useState, useEffect, useContext, FormEvent } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import fetchJson from "lib/fetchJson";
import moment from "moment";
import { UserContext } from "lib/UserContext";

// import type { User } from "api/user";
// import fetchJson, { FetchError } from "lib/fetchJson";

import Asset from "comps/Asset";
import AssetCarosel from "comps/AssetCarosel";
import Loader from "comps/Loader";
import Bubble from "comps/Bubble";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Offer({
  id,
  userId,
  nftId,
  asset,
  href,
  onClose,

  refresh,
  hideHeader,
}) {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState();
  const [simlar, setSimilar] = useState();
  // const [offer, setOffer] = useState();

  useEffect(() => {
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

  const getDate = (utcSeconds) => {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);

    return moment(d).format("MMM Do YY, h:mm:ss a");
  };
  const getAttributes = (attrb, token, type) => {
    switch (type) {
      case "CHAR":
        switch (token) {
          case "GORDOLA":
            return (
              <>
                <div className="flex-justify-btw list-spacing-sml">
                  <span>Skin Code</span>
                  <div className="div-lin" />
                  <span>{attrb.skinCode}</span>
                </div>
                <div className="flex-justify-btw list-spacing-sml">
                  <span>Points Coefficient</span>
                  <div className="div-lin" />
                  <span>{attrb.pointsCoefficient}</span>
                </div>
                <div className="flex-justify-btw list-spacing-sml">
                  <span>Last Insulin Use</span>
                  <div className="div-lin" />
                  <span>{getDate(attrb.lastInsulinUseExpiration)}</span>
                </div>
                <div className="flex-justify-btw list-spacing-sml">
                  <span>Matches until next shot</span>
                  <div className="div-lin" />
                  <span>
                    {attrb.remainingMatchesUntilLastInsulinUseExpiration}
                  </span>
                </div>{" "}
                <div className="flex-justify-btw list-spacing-sml">
                  <span>Time of hear attack</span>
                  <div className="div-lin" />
                  <span>{getDate(attrb.heartAttackTime)}</span>
                </div>
                <style jsx>
                  {`
                    span {
                      white-space: nowrap;
                    }
                    div {
                      padding: 0.5rem 0;
                    }
                    div > *:first-child {
                      font-weight: 600;
                      opacity: 0.6;
                    }
                    .div-lin {
                      width: 100%;
                      border-bottom: 1px solid #ffffff10;
                    }
                  `}
                </style>
              </>
            );
            break;
          default:
            return <div>NFT info</div>;
            break;
        }
        break;
      case "GAME_ITEM":
        switch (token) {
          case "INSULIN":
            return (
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    opacity: 0.6,
                    marginBottom: ".5rem",
                  }}
                >
                  About
                </p>
                <p>
                  Insulin can be used to revive your fatty and get him back into
                  the race.
                </p>
              </div>
            );
            break;
          case "DEFIBRILATOR":
            return (
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    opacity: 0.6,
                    marginBottom: ".5rem",
                  }}
                >
                  About
                </p>
                <p>
                  We all need a little pick-me-up sometimes. Use the
                  Defibrilator to bring your Fatty back from the edge.
                </p>
              </div>
            );
            break;
          default:
            return <div>In Game Item info</div>;
            break;
        }
        break;
      case "BOX":
        switch (token) {
          case "BOX1":
            return (
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    opacity: 0.6,
                    marginBottom: ".5rem",
                  }}
                >
                  About
                </p>
                <p>Boxes are a great way to earn rare, valuable fatties.</p>
              </div>
            );
            break;
          case "BOX2":
            return (
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    opacity: 0.6,
                    marginBottom: ".5rem",
                  }}
                >
                  About
                </p>
                <p>Boxes are a great way to earn rare, valuable fatties.</p>
              </div>
            );
            break;
          default:
            return <div>Boc info</div>;
            break;
        }
        break;

      default:
        break;
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {!loading && offer ? (
        <>
          <Asset
            isBox={offer.tokenCategory === "BOX"}
            hideHeader={hideHeader}
            data={offer}
            onClose={onClose}
            path={router.pathname.replace("/", "")}
          >
            <div className="vert-space-med">
              <div>
                <div className="flex-align-center flex-justify-btw">
                  <h1>
                    {offer.title ? offer.title : offer.token}{" "}
                    {offer.tokenType === "NON_FUNGIBLE" && (
                      <span style={{ opacity: 0.3 }}>(NFT)</span>
                    )}
                  </h1>
                  <div className="flex-align-center flex-justify-btw list-spacing-sml">
                    {offer.tokenGames.map((of) => (
                      <Bubble>{of}</Bubble>
                    ))}
                  </div>{" "}
                </div>
                <p>ID: {offer.id}</p>
              </div>
              <div className="attributes-wrapper">
                <p
                  style={{
                    fontWeight: 600,
                    opacity: 0.6,
                    marginBottom: ".5rem",
                  }}
                >
                  Description
                </p>
                <p>{offer.description}</p>
              </div>
              <div className="attributes-wrapper">
                {getAttributes(
                  offer.nftAttrs,
                  offer.token,
                  offer.tokenCategory
                )}
              </div>
              <div className="list-spacing-sml flex-align-center">
                {console.log("offer: ", offer)}
                <button className="price-button" style={{ width: "100%" }}>
                  {offer.availableAmount
                    ? `Available: ${
                        offer.availableAmount > 999000
                          ? "999k+"
                          : numberWithCommas(offer.availableAmount)
                      } - `
                    : ""}
                  Price: {numberWithCommas(offer.price)}{" "}
                  {offer.currencyTokenBase === "IOM"
                    ? "$IOM"
                    : offer.currencyTokenBase}
                </button>
              </div>
              <PurchaseOffer
                href={href}
                offer={offer}
                user={user}
                id={id}
                setErrorMsg={setErrorMsg}
                refresh={refresh}
              />
              {errorMsg && <p className="error-wrapper">⛔ {errorMsg}</p>}
            </div>
          </Asset>

          <AssetCarosel slides={simlar} />
        </>
      ) : (
        <p>No offer found</p>
      )}
      <style jsx>
        {`
          .price-button,
          .price-button:hover {
            border-radius: 50px;
            width: 100%;
            border: 2px solid #fff;
            color: #fff;
            cursor: auto;
            background: #33363d;
          }

          .attributes-wrapper {
            border-radius: 1rem;
            background: #ffffff10;
            padding: 1rem;
          }
        `}
      </style>
    </div>
  );
}

const PurchaseOffer = ({ offer, id, setErrorMsg, href, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [qt, setQt] = useState();
  const router = useRouter();
  // const offer = useRouter();
  const { user } = useUser({
    redirectTo: "",
    redirectIfFound: false,
  });
  const { newUser, refreshUSer } = useContext(UserContext);

  const owner = user.isLoggedIn && offer.userId === user.info.id;
  const purchaseOffer = async (event) => {
    event.preventDefault();

    //if not logged in redirect
    if (!user.isLoggedIn) return router.push("/login");
    setLoading(true);
    setErrorMsg("");
    try {
      //prchase offer
      if (owner) {
        await axios.delete(`https://api.apiiom.com/store/offer/${id}`, {
          headers: { Authorization: user.token },
        });
        console.log("Offer Deleted");
      } else {
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
      }

      //add new asset to balance - refresh user
      refreshUSer();
      refresh();

      href ? router.push(href) : router.push("/wallet");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
          router.push("/login");
        }
        console.error("Error:", error.response.data);
        setErrorMsg(error.response.data.message);
      } else console.error("An unexpected error happened:", error);
    }

    setLoading(false);
  };
  const getBnb = () => {
    let bnb = 0;
    if (!user.isLoggedIn) return bnb;
    if (user.bnb) {
      bnb = user.bnb;
    } else {
      const bnbBal = user.balances.find((b) => b.token === "BNB");
      bnb = bnbBal ? bnbBal.amount : 0;
    }
    return bnb;
  };
  const bnb = getBnb();
  console.log("bnb: ", bnb);

  const fundsCheck = offer.currencyTokenBase === "IOM" ? user.iom : bnb;
  console.log("fundsCheck: ", fundsCheck);
  console.log("offer.price: ", offer.price);

  return (
    <form
      onSubmit={(event) => purchaseOffer(event)}
      className="flex-align-center list-spacing-sml"
    >
      {offer.tokenType === "FUNGIBLE" && (
        <label style={{ width: "100%" }}>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity..."
            onChange={() => setQt(event.target.value)}
            value={qt}
            required
          />
        </label>
      )}
      <button type="submit" style={{ width: "100%" }} className={`primary`}>
        {loading ? (
          <Loader />
        ) : owner ? (
          "Delete Offer"
        ) : offer.price > fundsCheck ? (
          "Insufficient Funds"
        ) : (
          `Buy ${
            qt > 1
              ? `(${qt * offer.price} ${
                  offer.currencyTokenBase === "IOM" ? "IOM" : "BNB"
                })`
              : ""
          }`
        )}
      </button>
    </form>
  );
};
