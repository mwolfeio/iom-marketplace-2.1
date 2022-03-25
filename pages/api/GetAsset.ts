import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default fetchAsset;

async function fetchAsset(req: NextApiRequest, res: NextApiResponse) {
  const { assetId = "" } = await req.body;

  try {
    const { data } = await axios.get(
      `https://api.apiiom.com/store/offer?size=${size}&page=${page}${
        tokenCategories.length
          ? `&tokenCategories=${tokenCategories.toString()}`
          : ""
      }${sortMode ? `&sortMode=${sortMode}` : ""}${
        tokenGames.length ? `&tokenGames=${tokenGames.toString()}` : ""
      }${priceFrom ? `&priceFrom=${priceFrom}` : ""}${
        priceTo ? `&priceTo=${priceTo} ` : ""
      }`
    );
    console.log("NFTOffers data: ", data);

    res.json(data);
  } catch (error) {
    console.log("NFT Offers error:", error);
    // res.status(500).json({ message: (error as Error).message });
  }
}
