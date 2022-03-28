// @ts-nocheck
import React, { useState } from "react";
import GalleryPage from "comps/GalleryPage";

export default function Home() {
  return (
    <GalleryPage
      sideNav={true}
      title="Marketplace"
      defaults={{ tokenCategories: ["CHAR"] }}
      placeholder="No Characters"
    />
  );
}
