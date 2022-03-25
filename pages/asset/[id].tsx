import React from "react";
import { useRouter } from "next/router";

import Layout from "comps/Layout";
import Asset from "comps/Asset";

export default function SgProfile() {
  let router = useRouter();

  console.log("router.query.id:  ", router.query.id);

  return (
    <Layout>
      <Asset id={router.query.id} />
    </Layout>
  );
}
