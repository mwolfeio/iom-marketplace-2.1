// @ts-nocheck
import React from "react";
import { useRouter } from "next/router";

import Layout from "comps/Layout";
import Offer from "comps/Offer";

export default function SgProfile() {
  let router = useRouter();

  console.log("router.query.id:  ", router.query.id);

  return (
    <Layout>
      <Offer id={router.query.id} nftId="1234" />
    </Layout>
  );
}
