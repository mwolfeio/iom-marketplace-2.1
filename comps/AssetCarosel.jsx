import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import Link from "next/link";
import ItemBack from "assets/media/ItemBack.png";

import CharGalleryItem from "comps/CharGalleryItem";
import ItemGalleryItem from "comps/ItemGalleryItem";
import BoxGalleryItem from "comps/BoxGalleryItem";

const getDate = (utcSeconds) => {
  var myDate = new Date(utcSeconds * 1000);
  return myDate.toLocaleString();
};

const EmblaCarousel = ({ slides }) => {
  const [list, setList] = useState([]);
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    align: "start",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);
  useEffect(() => {
    if (slides) setList(slides);
  }, [slides]);

  const getComp = (cat, item) => {
    switch (cat) {
      case "BOX":
        return <BoxGalleryItem data={item} />;
        break;

      case "GAME_ITEM":
        return <ItemGalleryItem data={item} />;
        break;
      default:
        return <CharGalleryItem data={item} />;
        break;
    }
  };

  return (
    <>
      <div className="sim-itm-head">Similar Items</div>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {list.map((item, index) => (
              <Link href={`/offer/${item.id}`}>
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    {getComp(item.tokenCategory, item)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sim-itm-head {
          margin: 2rem 0 1rem;
          padding-bottom: 0.5rem;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #b1b5c3;
          border-bottom: 1px solid #ffffff30;
        }
        .gallery-itme-image-wrapper {
          height: 0;
          border-bottom: 2px solid #ffffff;
          width: 100%;
          padding-bottom: 100%;
          position: relative;

          overflow: hidden;

          border: 2px solid #fff;
          box-sizing: border-box;
          filter: drop-shadow(-4.46782px 4.46782px 0 rgba(255, 255, 255, 0.25));
          border-radius: 11.1695px;
          margin-bottom: 1rem;
        }
        .gallery-itme-image-wrapper button,
        .gallery-itme-image-wrapper button:hover {
          border: 1px solid white;
          border-radius: 4rem;
          color: white;
        }
        .gallery-itme-image-wrapper button {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }

        .embla {
          position: relative;
          padding: 0;
          margin-left: auto;
          margin-right: auto;
        }

        .embla__viewport {
          overflow: hidden;
          padding: 1rem 0;
          width: 100%;
        }

        .embla__viewport.is-draggable {
          cursor: move;
          cursor: grab;
        }

        .embla__viewport.is-dragging {
          cursor: grabbing;
        }

        .embla__container {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
          margin-left: -10px;
        }

        .embla__slide {
          cursor: pointer;
          position: relative;
          min-width: 50%;
          padding-left: 1rem;
        }

        .embla__slide__inner {
          position: relative;
        }

        .embla__slide__img {
          position: absolute;
          display: block;
          top: 50%;
          left: 50%;
          width: auto;
          min-height: 100%;
          min-width: 100%;
          max-width: none;
          transform: translate(-50%, -50%);
        }

        @media (min-width: 768px) {
          .embla__slide {
            position: relative;
            min-width: 33.33%;
            padding-left: 1rem;
          }
        }
        @media (min-width: 1000px) {
          .embla__slide {
            position: relative;
            min-width: 25%;
            padding-left: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default EmblaCarousel;
