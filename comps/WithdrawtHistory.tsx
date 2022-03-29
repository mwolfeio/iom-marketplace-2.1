// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";
import List from "comps/List";

export default function Comp({ arr, hook }) {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) getHistory();
  }, [user]);

  useEffect(() => {
    setHistory([...arr, ...history]);
  }, [arr]);

  const getHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.apiiom.com/bank/withdrawals?withdrawalStatus=IN_PROCESS",
        {
          headers: { Authorization: user.token },
        }
      );
      const confirmed = await axios.get(
        "https://api.apiiom.com/bank/withdrawals?withdrawalStatus=COMPLETE",
        {
          headers: { Authorization: user.token },
        }
      );
      const cancled = await axios.get(
        "https://api.apiiom.com/bank/withdrawals?withdrawalStatus=CANCELED",
        {
          headers: { Authorization: user.token },
        }
      );

      data.concat(confirmed.data, cancled.data);

      console.log("data:", data);
      setHistory(data);
    } catch (error) {
      console.log("Error: ", error.response);
      if (error.respons) setError(error.response.data.message);
    }
    setLoading(false);
  };
  const goTo = () => {
    console.log("go to");
  };

  return (
    <>
      <div className="deposit-hitory-wrapper">
        <List
          loading={loading}
          title="Withdrawal Hisotry"
          placeholder="No Withdrawals"
          data={history}
          schema={[
            { type: "icon", key: "" },
            { type: "text", key: "token" },
            { type: "text", key: "amount" },
            { type: "text", key: "status" },
            { type: "text", key: "walletAddress" },

            {
              type: "button",
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
