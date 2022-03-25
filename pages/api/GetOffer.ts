import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default fetchOffer;

async function fetchOffer(req: NextApiRequest, res: NextApiResponse) {
  const { id } = await req.body;

  try {
    const { data } = await axios.get(
      `https://api.apiiom.com/store/offer/${id}`
    );

    res.json(data);
  } catch (error) {
    console.log("error getting offer:", error);
    res.status(500).json({ message: (error as Error).message });
  }
}
