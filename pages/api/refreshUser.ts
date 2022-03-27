// @ts-nocheck
import axios from "axios";
import type { User } from "./user";
// import useUser from "lib/useUser";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { info, token } = await req.body;

  try {
    const { data } = await axios.get("https://api.apiiom.com/bank/balances", {
      headers: { authorization: token },
    });

    const filteredBalances = data.filter((b) => b.amount > 0);
    const iom = data.find((b) => b.token === "IOM").amount;
    const userData = {
      // isLoggedIn: true,
      info,
      token,
      iom,
      balances: filteredBalances,
    };

    req.session.user = userData;
    await req.session.save();
    res.json(userData);
  } catch (error) {
    console.log("API Error:", error);
    res.status(500).json(error);
  }
}
