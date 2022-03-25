import axios from "axios";
import type { User } from "./user";

import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  try {
    console.log("Logging in");
    const {
      data: { user, token, balances },
    } = await axios.post("https://api.apiiom.com/user/login", {
      email: email,
      password: password,
    });

    const userData = {
      isLoggedIn: true,
      info: user,
      token,
      balances,
      // schema: sch.data,
    } as User;

    console.log("userData: ", userData);

    req.session.user = userData;
    // req.session.schema = { schema: sch.data };

    await req.session.save();
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}
