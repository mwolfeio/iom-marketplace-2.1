import axios from "axios";
import type { User } from "./user";

import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
const octokit = new Octokit();

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  try {
    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username })

    const {
      data: { user, token, balances },
      // data: { login, avatar_url },
    } = await axios.post("https://api.apiiom.com/user/login", {
      email: email,
      password: password,
    });

    const userData = {
      isLoggedIn: true,
      info: user,
      token,
      balances,
      avatarUrl: "https://avatars.githubusercontent.com/u/90003090?v=4",
    } as User;
    req.session.user = userData;
    await req.session.save();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
