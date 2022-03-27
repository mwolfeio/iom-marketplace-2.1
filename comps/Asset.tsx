// @ts-nocheck
import { useEffect, useState, FormEvent } from "react";
import useUser from "lib/useUser";

import CreateOffer from "comps/CreateOffer";

export default function Comp({ data }) {
  const [owned, setOwned] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (data && user.isLoggedIn) {
      setOwned(user.info.id === data.ownerUserId);
    }
  }, [user, data]);

  return (
    <div>
      <h2>Asset</h2>
      <CreateOffer show={owned} data={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <style jsx>{``}</style>
    </div>
  );
}
