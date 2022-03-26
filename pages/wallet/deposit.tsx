import React, { useState } from "react";
import Router from "next/router";

import Layout from "comps/Layout";
import Deposit from "comps/Deposit";

export default function Comp() {
  return (
    <Layout>
      <Deposit />
      <div>Deposit History</div>
    </Layout>
  );
}
