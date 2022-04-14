// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import fetchJson from "lib/fetchJson";
import { useRouter } from "next/router";
import useUser from "lib/useUser";

import List from "comps/List";
import Modal from "comps/Modal";
import OpenBox from "comps/OpenBox";
import Loader from "comps/Loader";
import Icon from "assets/icons/Box";

export default function SgProfile({ data, user, refresh }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newChar, setNewChar] = useState([]);
  const { mutateUser } = useUser();
  const router = useRouter();

  const openBoxes = async (token, count = 1) => {
    console.log("running openBoxes");
    setErrorMsg("");
    setLoading(true);
    setOpen(true);
    try {
      let payload = {
        box: token,
        charToBeMinted: "GORDOLA",
        amount: count,
      };
      console.log("payload: ", payload);

      //open the box
      const { data } = await axios.post(
        `https://api.apiiom.com/store/box/open`,
        payload,
        {
          headers: { Authorization: user.token },
        }
      );

      //display new Char
      console.log("Box res: ", data);
      setNewChar(data);

      //toast

      //opent modal
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg(
        error.response ? error.response.data.message : "There was an error"
      );
    }
    setLoading(false);
  };
  const onClose = async () => {
    console.log("Closing and refreshing");

    //clsoe modal
    setOpen(false);
    setNewChar([]);

    //refresh user
    try {
      console.log("current user: ", user);

      const res = await fetch("/api/refreshUser", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const d = await res.json();
      console.log("d: ", d);
      refresh(d);
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

  return (
    <div>
      {open && (
        <Modal onClose={onClose}>
          {loading ? (
            <Loader />
          ) : (
            <OpenBox content={newChar} hook={onClose} errorMsg={errorMsg} />
          )}
        </Modal>
      )}
      <List
        title="Boxes"
        data={data}
        icon={Icon}
        placeholder="No Boxes"
        schema={[
          { type: "icon", key: "", name: "Type" },
          { type: "text", key: "token", name: " " },
          { type: "text", key: "amount", name: "Amount" },
          { type: "text", key: "tokenGames", name: "Game" },

          {
            type: "button",
            key: "Open",
            count: 1,
            hook: openBoxes,
            name: "Actions",
          },
          {
            type: "button",
            key: "Open All",
            count: "all",
            hook: openBoxes,
            className: "primary",
            name: " ",
          },
        ]}
      />
    </div>
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
