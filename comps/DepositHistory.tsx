// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";
import Icon from "assets/icons/Deposit";
import { useRouter } from "next/router";

import fetchJson from "lib/fetchJson";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";
import List from "comps/List";

export default function Comp({ arr }) {
  const { user, mutateUser } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) getHistory();
  }, [user]);

  const getHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.apiiom.com/bank/deposits?depositStatus=CONFIRMED",
        {
          headers: { Authorization: user.token },
        }
      );

      console.log("data:", data);
      setHistory(data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
          router.push("/login");
        }
        console.error("Error:", error.response.data);
        setError(error.response.data.message);
      } else console.error("An unexpected error happened:", error);
    }
    setLoading(false);
  };
  const goTo = (itm) => {
    window.open(`https://bscscan.com/address/${itm}`, "_newtab");
  };

  return (
    <>
      <div className="deposit-hitory-wrapper">
        <List
          loading={loading}
          title="Summary"
          data={history}
          icon={Icon}
          schema={[
            { type: "icon", key: "", name: "Token" },
            { type: "text", key: "token", name: "  " },
            { type: "text", key: "amount", name: "Amount" },
            { type: "text", key: "status", name: "Status" },
            { type: "address", key: "id", name: "Txid" },
            {
              type: "button",
              hookType: "link",
              name: "View",
              key: "View",
              hook: goTo,
              className: "",
            },
          ]}
        />
      </div>
      <style jsx>{`
        .deposit-hitory-wrapper h3 {
          opacity: 0.3;
        }
      `}</style>
    </>
  );
}
