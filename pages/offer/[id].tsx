import React from "react";
import { useRouter } from "next/router";

import Layout from "comps/Layout";
import Offer from "comps/Offer";

export default function SgProfile() {
  let router = useRouter();

  return (
    <Layout>
      <Offer id={router.query.id} nftId="1234" />
    </Layout>
  );
}
