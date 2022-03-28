// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";

import Layout from "comps/Layout";
import Gallery from "comps/Gallery";
import Wallet from "comps/Wallet";
import List from "comps/List";
import Bubble from "comps/Bubble";

export default function SgProfile() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState([]);
  const [iom, setIom] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [items, setItems] = useState([]);
  const [chars, setChars] = useState([]);
  // const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState();

  const { user, mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("Detected a change in the user");
    if (user) hydratePage();
  }, [JSON.stringify(user)]);

  const hydratePage = async () => {
    console.log("hydrating page because user state changed");

    setLoading(true);
    await getChars();

    const bal = user.balances;
    const sch = await getSchema();

    hydratBlanace(bal, sch);
    setLoading(false);
  };
  const getChars = async () => {
    try {
      const {
        data: { rows, pages },
      } = await axios.get(
        `https://api.apiiom.com/store/user/char?page=0&size=50`,
        {
          headers: { Authorization: user.token },
        }
      );

      setChars(rows);
      // setOffers(data);
      setPageCount(pages);
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
  };
  const getSchema = async () => {
    try {
      //check session storage
      let local = sessionStorage.getItem("schema");
      if (local) {
        const data = JSON.parse(local);
        setSchema(data);
        return data;
      }

      //get from api
      const { data } = await axios.get("https://api.apiiom.com/bank/tokens", {
        headers: { Authorization: user.token },
      });
      sessionStorage.setItem("schema", JSON.stringify(data));
      setSchema(data);
      return data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        setErrorMsg(error.response.data.message);
      } else console.error("An unexpected error happened:", error);
    }
  };
  const hydratBlanace = (bal, sch) => {
    if (!bal) return;
    const merge = bal.map(({ amount, token }) => {
      const info = sch.find((o) => o.token === token);
      return { amount, ...info };
    });

    //IOM
    setIom(merge.filter((o) => o.tokenCategory === "CURRENCY"));
    //Boxes
    setBoxes(merge.filter((o) => o.tokenCategory === "BOX"));
    //Game Items
    setItems(merge.filter((o) => o.tokenCategory === "GAME_ITEM"));
  };
  const getMore = () => router.push("/game-items");

  return (
    <Layout>
      <div className="vert-space-med">
        <div className="flex-justify-btw flex-align-center list-spacing-med">
          <h1>Wallet</h1> <Bubble>{user && user.info.email}</Bubble>
        </div>
        {user && schema && (
          <>
            <Wallet data={iom} />
            <div className="extras-wrapper">
              <List
                title="Boxes"
                data={boxes}
                schema={[
                  { type: "icon", key: "" },
                  { type: "text", key: "token" },
                  { type: "text", key: "amount" },
                  { type: "text", key: "tokenGames" },

                  {
                    type: "button",
                    key: "Open",
                    hook: getMore,
                  },
                  {
                    type: "button",
                    key: "Open All",
                    hook: getMore,
                    className: "primary",
                  },
                ]}
              />

              <List
                title="Game Items "
                data={items}
                schema={[
                  { type: "icon", key: "" },
                  { type: "text", key: "token" },
                  { type: "text", key: "amount" },
                  { type: "text", key: "tokenGames" },
                  {
                    type: "button",
                    key: "Get More",
                    hook: getMore,
                    className: "primary",
                  },
                ]}
              />
            </div>
          </>
        )}
        <h3>Chars:</h3>
        {errorMsg ? (
          <p className="error">{errorMsg}</p>
        ) : (
          <Gallery
            data={chars}
            hook={getChars}
            loading={loading}
            type="asset"
            placeholder="No Characters"
          />
        )}
      </div>
      <style jsx>{`
        .extras-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 1rem;
        }
        @media (min-width: 1000px) {
          .extras-wrapper {
            grid-gap: 24px;

            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}

// <h2>Info</h2>
// <pre>
//   {JSON.stringify(
//     {
//       isLoggedIn: user.isLoggedIn,
//       token: user.token,
//       info: user.info,
//     },
//     null,
//     2
//   )}
// </pre>
// <h2>Balance</h2>
