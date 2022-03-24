import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default fetchOffers;

async function fetchOffers(req: NextApiRequest, res: NextApiResponse) {
  const {
    page = 0,
    size = 30,
    sortAttributeName = "",
    sortMode = "",
    tokenGames = "",
    priceFrom,
    priceTo,
  } = await req.body;

  try {
    console.log("Getting Nft Offers");
    const { data } = await axios.get(
      "https://api.apiiom.com/store/offer?page=0&size=10"
    );
    console.log("NFTOffers data: ", data);

    res.json(data);
  } catch (error) {
    console.log("NFT Offers error:", error);
    // res.status(500).json({ message: (error as Error).message });
  }
}
