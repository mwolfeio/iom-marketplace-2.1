// @ts-nocheck

import Image from "next/image";
import ItemBack from "assets/media/ItemBack.png";
import Media from "comps/MediaManager";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Comp({
  data: { token, tokenCategory, availableAmount, images = [], price, title },
  owned,
}) {
  return (
      <div className="char-item-wrapper flex-col">
        <div className="gallery-itme-image-wrapper">
          <div className="game-icons" />
          <Image src={ItemBack} layout="fill" />
          <Media className="char-img" type={tokenCategory} token={token} />
        </div>
      </div>
  );
}

//        <pre>{JSON.stringify(data, null, 2)}</pre>
