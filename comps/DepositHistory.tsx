import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";

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
        "https://api.apiiom.com/bank/deposits?depositStatus=PENDING",
        {
          headers: { Authorization: user.token },
        }
      );
      const confirmed = await axios.get(
        "https://api.apiiom.com/bank/deposits?depositStatus=PENDING",
        {
          headers: { Authorization: user.token },
        }
      );

      data.concat(confirmed.data);

      console.log("data:", data);
      setHistory(data);
    } catch (error) {
      console.log("Error: ", error.response);
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;
  return (
    <>
      <div>Deposit History</div>
      <div className="deposit-hitory-wrapper">
        {loading ? (
          <Loader />
        ) : history.length ? (
          history.map((item) => <pre>{JSON.stringify(item, null, 2)}</pre>)
        ) : (
          <h3>No Deposits</h3>
        )}
      </div>
      <style jsx>{`
        .deposit-hitory-wrapper h3 {
          opacity: 0.3;
        }
      `}</style>
    </>
  );
}
