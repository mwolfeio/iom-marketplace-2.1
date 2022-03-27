// @ts-nocheck

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default fetchOffers;

async function fetchOffers(req: NextApiRequest, res: NextApiResponse) {
  const {
    page = 0,
    size = 30,
    sortAttributeName = "",
    sortMode = "",
    tokenGames = [],
    priceFrom = 0,
    priceTo = 0,
    tokenCategories = [],
  } = await req.body;

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
