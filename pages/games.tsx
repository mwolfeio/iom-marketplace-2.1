import Layout from "comps/Layout";
import Image from "next/image";
import Games from "comps/Games";

export default function Home() {
  return (
    <Layout>
      <h1>Games</h1>
      <Games />
    </Layout>
  );
}
