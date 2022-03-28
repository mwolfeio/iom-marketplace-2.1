// @ts-nocheck
import "styles/global.css";
import "styles/buttons.css";

import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";

import fetchJson from "lib/fetchJson";
import Background from "assets/media/Background";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Background />
      <Component {...pageProps} />
      <Toaster />
    </SWRConfig>
  );
}

export default MyApp;
