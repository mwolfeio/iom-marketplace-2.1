// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";

import List from "comps/List";
import Modal from "comps/Modal";
import OpenBox from "comps/OpenBox";
import Loader from "comps/Loader";

export default function SgProfile({ data, user, refresh }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newChar, setNewChar] = useState([]);

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
      console.log("Error: ", error);
      if (error.response) setErrorMsg(`Error: ${error.response.data.message}`);
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
        schema={[
          { type: "icon", key: "" },
          { type: "text", key: "token" },
          { type: "text", key: "amount" },
          { type: "text", key: "tokenGames" },

          {
            type: "button",
            key: "Open",
            count: 1,
            hook: openBoxes,
          },
          {
            type: "button",
            key: "Open All",
            count: "all",
            hook: openBoxes,
            className: "primary",
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
