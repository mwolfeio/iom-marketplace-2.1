// @ts-nocheck
import React, { useState } from "react";
import GalleryPage from "comps/GalleryPage";

export default function Home() {
  return (
    <GalleryPage
      title="Boxes"
      defaults={{ tokenCategories: ["BOX"] }}
      placeholder="No Boxes"
    />
  );
}
