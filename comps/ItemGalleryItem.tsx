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
    <>
      <div className="char-item-wrapper flex-col">
        <div className="gallery-itme-image-wrapper">
          <div className="game-icons" />
          <Image src={ItemBack} layout="fill" />
          <Media className="char-img" type={tokenCategory} token={token} />
        </div>
      </div>
      /*
      <div className="char-item-wrapper flex-col">
        <div className="gallery-itme-image-wrapper">
          <div className="game-icons" />
          <Image src={ItemBack} layout="fill" />
          <Media className="char-img" type={tokenCategory} token={token} />
        </div>
        <div className="gallery-item-info-wrapper">
          <div
            style={{ opacity: 0.33 }}
            className="flex-align-center flex-justify-btw"
          >
            <p>Game Item</p>
            <p>Available</p>
          </div>
          <div className="flex-align-center flex-justify-btw">
            <h3>{title ? title : token}</h3>
            <h3>
              {availableAmount > 999000
                ? "999k+"
                : numberWithCommas(availableAmount)}
            </h3>
          </div>
          {owned ? (
            <button style={{ marginTop: ".5rem" }} className="primary">
              Sell
            </button>
          ) : (
            <div
              style={{ marginTop: "12px" }}
              className="flex-align-center flex-justify-btw list-spacing-sml"
            >
              <button>{price ? numberWithCommas(price) : 0} $IOM</button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .char-item-wrapper {
          color: white;
          overflow: hidden;
          width: 100%;
          background: #1d2028;
          border: 2px solid #ffffff;
          box-sizing: border-box;
          filter: drop-shadow(
            -4.46782px 4.46782px 0px rgba(255, 255, 255, 0.25)
          );
          border-radius: 11.1695px;
        }

        .gallery-itme-image-wrapper {
          height: 0;
          border-bottom: 2px solid #ffffff;
          width: 100%;
          padding-bottom: 100%;
          position: relative;
        }
        .gallery-itme-image-wrapper button {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }

        .gallery-item-info-wrapper {
          width: 100%;
          padding: 1rem;
        }

        .gallery-itme-image-wrapper span {
          object-fit: cover !important;
          border: 10px solid red;
        }
      `}</style>
      */
    </>
  );
}

//        <pre>{JSON.stringify(data, null, 2)}</pre>
