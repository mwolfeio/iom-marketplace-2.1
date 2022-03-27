import React, { useState } from "react";
import Router from "next/router";

import Layout from "comps/Layout";
import Deposit from "comps/Deposit";
import History from "comps/DepositHistory";
import BreadCrumbs from "comps/BreadCrumbs";

export default function Comp() {
  return (
    <Layout>
      <BreadCrumbs />
      <Deposit />
      <History />
    </Layout>
  );
}
