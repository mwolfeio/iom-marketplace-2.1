// @ts-nocheck

import Image from "next/image";
import ItemBack from "assets/media/ItemBack.png";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Comp({ data: { images = [], price }, owned }) {
  return (
    <>
      <div className="char-item-wrapper flex-col">
        <div className="gallery-itme-image-wrapper">
          <div className="game-icons" />
          <Image src={ItemBack} layout="fill" />

          {images.length > 0 ? (
            <Image className="char-img" src={images[0]} layout="fill" />
          ) : (
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
          )}
          <button>Rarity</button>
        </div>
        <div className="gallery-item-info-wrapper">
          <div
            style={{ opacity: 0.33 }}
            className="flex-align-center flex-justify-btw"
          >
            <p>#000</p>
            <p>Supply</p>
          </div>
          <div className="flex-align-center flex-justify-btw">
            <h3>Name</h3>
            <h3>000</h3>
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
              <button>{price ? numberWithCommas(price) : 0} IOM</button>
              <button className="primary">Buy</button>
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
    </>
  );
}

//        <pre>{JSON.stringify(data, null, 2)}</pre>
