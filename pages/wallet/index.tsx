// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";

//comps
import Head from "next/head";
import Layout from "comps/Layout";
import Gallery from "comps/Gallery";
import Wallet from "comps/Wallet";
import List from "comps/List";
import Boxes from "comps/Boxes";
import Img from "assets/media/thumbnail.png";
import Pagination from "comps/Pagination";
import Bubble from "comps/Bubble";
import Modal from "comps/Modal";

//icons
import Shot from "assets/icons/Shot";
import Defib from "assets/icons/Defib";

export default function SgProfile() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState([]);
  const [iom, setIom] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [items, setItems] = useState([]);
  const [chars, setChars] = useState([]);
  const [userState, setUserState] = useState();
  const [pageCount, setPageCount] = useState();
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(true);

  const { user, mutateUser } = useUser();
  const router = useRouter();
  // const alreadyLoggedIn =

  useEffect(() => {
    console.log("Detected a change in the user");

    if (user) {
      setUserState(user);
    }
  }, [JSON.stringify(user)]);
  useEffect(() => {
    console.log("Detected a change in the user state");

    if (userState) {
      hydratePage();
    }
  }, [userState]);

  useEffect(() => {
    setAlreadyLoggedIn(
      JSON.parse(localStorage.getItem("already-logged-in")) || false
    );
  }, [userState]);

  const hydratePage = async () => {
    console.log("hydrating page because user state changed");

    setLoading(true);
    await getChars();

    const bal = userState.balances;
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
        console.log("error.response.status: ", error.response.status);
        if (error.response.status === 401) {
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);

          router.push("/login");
        }
        setErrorMsg(error.response.data.message);
      } else {
        console.log("Error: ", error);
      }
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
  const openBoxes = async (token) => {
    console.log("running openBoxes");

    try {
      let payload = {
        box: token,
        charToBeMinted: "IOM",
        amount: 0,
      };
      console.log("payload: ", payload);

      //open the box
      const { data } = await axios.get(
        `https://api.apiiom.com/store/box/open`,
        payload,
        {
          headers: { Authorization: user.token },
        }
      );

      //display new Char
      console.log("Box res: ", data);

      //refreshthe page
    } catch (error) {
      console.error("Error:", error.response);
      setErrorMsg(
        error.response ? error.response.data.message : "There was an error"
      );
    }
  };
  const getIcon = (token) => {
    console.log("running getIcon for type:", token);

    switch (token) {
      case "INSULIN":
        return Shot;
        break;

      case "DEFIBRILATOR":
        return Defib;
        break;
    }
  };
  const closeModal = () => {
    console.log("running closeModal-------------------------");
    //change user.firstTimeLogIn to false
    localStorage.setItem("already-logged-in", JSON.stringify(true));
    setAlreadyLoggedIn(true);
    // const neUser = { ...user };
    // neUser.firstTimeLogIn = false;
    // console.log("neUser: ", neUser);
    //
    // mutateUser(neUser);
  };

  return (
    <Layout>
      {user && !alreadyLoggedIn && (
        <Modal
          onClose={() => console.log("not closable")}
          style={{ maxWidth: "500px", margin: "2rem auto" }}
        >
          <>
            <h2 style={{ marginBottom: ".25rem" }}>⚠️ ATTENTION ⚠️</h2>
            <p>
              From the 23/05/2022th at 21:00h insulin and defibrillator fees will be billed in BNB - to learn more about HOW these fees will be used, visit our official Telegram.
            </p>
            <div
              style={{ marginTop: "1rem" }}
              className="flex-align-center flex-justify-center list-spacing-sml"
            >
              <button
                onClick={closeModal}
                style={{ width: "100%" }}
                className="primary"
              >
                Understood
              </button>
              <button style={{ width: "100%" }} onClick={() => {window.location='https://poocoin.app/tokens/0x6ff5595e7e69fe8d1d234cca60391bb5e848f83a';}}>I want to leave</button>
            </div>
          </>
        </Modal>
      )}
      <Head>
        <title>IOM — Wallet</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="title" content="IOM — Wallet" />
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
      </Head>{" "}
      <div className="vert-space-med">
        <div className="flex-justify-btw flex-align-center list-spacing-med">
          <h1>Wallet</h1>{" "}
          <Bubble>{user && user.isLoggedIn && user.info.email}</Bubble>
        </div>
        {user && schema && (
          <>
            <Wallet data={iom} />
            <div className="extras-wrapper">
              <Boxes data={boxes} user={user} refresh={setUserState} />
              <List
                placeholder="No Game Items"
                title="Game Items "
                data={items}
                schema={[
                  { type: "icon", key: "", comp: getIcon, name: "Item" },
                  { type: "text", key: "token", name: " " },
                  { type: "text", key: "amount", name: "Amount" },
                  { type: "text", key: "tokenGames", name: "Game" },
                  {
                    type: "button",
                    key: "Get More",
                    hook: getMore,
                    name: "Actions",
                    className: "primary",
                  },
                ]}
              />
            </div>
          </>
        )}
        {errorMsg ? (
          <p className="error">{errorMsg}</p>
        ) : (
          <>
            <Gallery
              wallet={true}
              title={"Characters"}
              data={chars}
              hook={getChars}
              loading={loading}
              type="asset"
              placeholder="No Characters"
            />
          </>
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
