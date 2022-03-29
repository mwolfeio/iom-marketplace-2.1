// @ts-nocheck
import React, { useState } from "react";
import Router from "next/router";

import Layout from "comps/Layout";
import Withdraw from "comps/Withdraw";
import History from "comps/WithdrawtHistory";
import BreadCrumbs from "comps/BreadCrumbs";

export default function Comp() {
  const [newWith, setNewWith] = useState([]);
  return (
    <Layout>
      <BreadCrumbs path={["wallet", "withdraw"]} />
      <Withdraw hook={setNewWith} />
      <History arr={newWith} />
    </Layout>
  );
}
