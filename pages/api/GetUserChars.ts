import axios from "axios";
// import useUser from "lib/useUser";
import { NextApiRequest, NextApiResponse } from "next";

export default fetchChars;

async function fetchChars(req: NextApiRequest, res: NextApiResponse) {
  // const {
  //   user: { isLoggedIn, token },
  // } = useUser();
  const { token } = await req.body;

  if (!isLoggedIn || !token)
    return res
      .status(401)
      .json({ message: "You need to be signed in to view your wallet" });

  console.log("tokem: ", token);

  try {
    const { data } = await axios.get(`https://api.apiiom.com/game/char`, {
      headers: { Authorization: token },
    });

    res.json(data);
  } catch (error) {
    console.log("error getting offer:", error);
    res.status(500).json({ message: (error as Error).message });
  }
}
