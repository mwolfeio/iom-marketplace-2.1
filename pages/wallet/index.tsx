import React, { useEffect, useState } from "react";
import useUser from "lib/useUser";
import { useRouter } from "next/router";

import Layout from "comps/Layout";
import Gallery from "comps/Gallery";

import fetchJson from "lib/fetchJson";

import axios from "axios";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [chars, setChars] = useState([]);
  const [offers, setOffers] = useState([]);
  const [pageCount, setPageCount] = useState();

  const { user, mutateUser } = useUser();

  const router = useRouter();

  useEffect(() => {
    getChars();
  }, [user]);

  const getChars = async () => {
    setLoading(true);

    try {
      const {
        data: { rows, pages },
      } = await axios.get(`https://api.apiiom.com/game/char`, {
        headers: { Authorization: user.token },
      });

      const { data } = await axios.get(
        `https://api.apiiom.com/store/user/offer?page=0&size=10`,
        {
          headers: { Authorization: user.token },
        }
      );

      setChars(rows);
      setOffers(data);
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
    setLoading(false);
  };

  // console.log("token: ", user.token);
  console.log("offers: ", offers);
  console.log("chars: ", chars);

  return (
    <Layout>
      <h1>Wallet / Profile</h1>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
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
