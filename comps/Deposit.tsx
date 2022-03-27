import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "lib/useUser";

//comps
import Loader from "comps/Loader";
import Copy from "assets/icons/Copy";

export default function Comp({ data }) {
  const { user } = useUser();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  const getAddress = async () => {
    setLoading(true);
    console.log("user token: ", user.token);

    try {
      const {
        data: { address },
      } = await axios.get("https://api.apiiom.com/bank/wallet/IOM/address", {
        headers: { Authorization: user.token },
      });
      console.log("address:", address);

      setCode(address);
    } catch (error) {
      console.log("Error: ", error);
      if (error.response) setError(error.response.data.message);
    }
    setLoading(false);
  };
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Address Coppied");
  };

  if (loading) return <Loader />;
  return (
    <>
      <div>Deposit QR Code</div>
      <div className="flex-align-center flex-justify-center list-spacing-sml">
        <p>
          <span className="deposit-text">Deposit Address:</span> <b>{code}</b>
        </p>
        <button className="icon" onClick={() => copyCode()}>
          <Copy />
        </button>
      </div>
      <style jsx>{`
        .deposit-text {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}
