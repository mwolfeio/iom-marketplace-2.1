// @ts-nocheck

import Image from "next/image";

//media
import Box2 from "assets/media/BOX_SKYZAOOO 2.png";
import Box1 from "assets/media/BOX_SKYZAOOO 1.png";
import Defib from "assets/media/DEFIB_SKYZAOOO 3.png";
import Shot from "assets/media/SHOT_SKYZAOOO 3.png";

export default function GalleryPage({ type, token, className }) {
  switch (type) {
    case "BOX":
      switch (token) {
        case "BOX1":
          return <Image className={className} src={Box1} layout="fill" />;
          break;

        case "BOX2":
          return <Image className={className} src={Box2} layout="fill" />;
          break;
      }
      break;
    case "GAME_ITEM":
      switch (token) {
        case "INSULIN":
          return <Image className={className} src={Shot} layout="fill" />;
          break;

        case "DEFIBRILATOR":
          return <Image className={className} src={Defib} layout="fill" />;
          break;
      }
      break;
    default:
      return (
        <div
          className="flex-align-center flex-justify-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <h1 style={{ opacity: 0.6 }}>No Image</h1>
        </div>
      );
  }
}
