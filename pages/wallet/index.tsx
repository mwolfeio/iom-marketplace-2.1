import React, { useEffect, useState } from "react";
import useUser from "lib/useUser";
import { useRouter } from "next/router";

import Layout from "comps/Layout";
import Gallery from "comps/Gallery";
import Wallet from "comps/Wallet";

import fetchJson from "lib/fetchJson";

import axios from "axios";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
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
    if (user) hydratePage();
  }, [user]);

  const hydratePage = async () => {
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

  return (
    <Layout>
      <h1>Wallet / Profile</h1>
      {user && schema && (
        <>
          <h2>Info</h2>
          <pre>
            {JSON.stringify(
              {
                isLoggedIn: user.isLoggedIn,
                token: user.token,
                info: user.info,
              },
              null,
              2
            )}
          </pre>
          <h2>Balance</h2>
          <Wallet data={iom} />
          <p>
            <b>Boxes (Carosel)</b>
          </p>
          <pre>{JSON.stringify(boxes, null, 2)}</pre>
          <p>
            <b>Game Items (List)</b>
          </p>
          <pre>{JSON.stringify(items, null, 2)}</pre>
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
    </Layout>
  );
}
