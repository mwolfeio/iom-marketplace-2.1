// @ts-nocheck
import "styles/global.css";
import "styles/buttons.css";

import { createContext, useContext, useEffect, useState } from "react";
import useUser from "lib/useUser";
import { UserContext } from "lib/UserContext";

import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";

import fetchJson from "lib/fetchJson";
import Background from "assets/media/Background";

function MyApp({ Component, pageProps }: AppProps) {
  const [newUser, setNewUser] = useState();
  const { user } = useUser();

  useEffect(() => {
    setNewUser(user);
  }, [user]);

  const refreshUSer = async () => {
    console.log("running refresh API in App");

    // await refreshUser(user);
    const response = await fetch("/api/refreshUser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setNewUser(data);
  };

  console.log("cache User--------------: ", user);
  console.log("app user--------------: ", newUser);

  return (
    <UserContext.Provider value={{ ...newUser, refreshUSer }}>
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
    </UserContext.Provider>
  );
}

export default MyApp;
