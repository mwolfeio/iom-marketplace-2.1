import React, { useState } from "react";
import GalleryPage from "comps/GalleryPage";

export default function Home() {
  return (
    <GalleryPage
      title="Game Items"
      defaults={{ tokenCategories: ["GAME_ITEM"] }}
    />
  );
}
