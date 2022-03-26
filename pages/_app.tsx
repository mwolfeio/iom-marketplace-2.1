import "styles/global.css";
import "styles/buttons.css";

import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";

import fetchJson from "lib/fetchJson";

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
      <Component {...pageProps} />
      <Toaster />
    </SWRConfig>
  );
}

export default MyApp;
