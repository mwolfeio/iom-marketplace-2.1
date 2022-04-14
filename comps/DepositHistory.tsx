// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";
import Icon from "assets/icons/Deposit";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";
import List from "comps/List";

export default function Comp({ arr }) {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      console.log("Error: ", error.response);
      setError(error.response.data.message);
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
