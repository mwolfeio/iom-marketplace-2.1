import React, { useState } from "react";
import GalleryPage from "comps/GalleryPage";

export default function Home() {
  return <GalleryPage defaults={{ tokenCategories: ["GAME_ITEM"] }} />;
}
