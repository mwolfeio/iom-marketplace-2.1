import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import ItemBack from "assets/media/ItemBack.png";

const getDate = (utcSeconds) => {
  var myDate = new Date(utcSeconds * 1000);
  return myDate.toLocaleString();
};

const EmblaCarousel = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 2,
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
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

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map(({ images, attrs }, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <div className="gallery-itme-image-wrapper">
                    <div className="game-icons" />
                    <Image src={ItemBack} layout="fill" />

                    {images.length > 0 ? (
                      <Image
                        className="char-img"
                        src={images[0]}
                        layout="fill"
                      />
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

                  <div>
                    <p>
                      <b>Heart Attack:</b> {getDate(attrs.heartAttackTime)}
                    </p>
                    <p>
                      <b>Last Insulin Shot:</b>{" "}
                      {attrs.lastInsulinUseExpiration
                        ? attrs.lastInsulinUseExpiration
                        : "Never"}
                    </p>

                    <p>
                      <b>Remaining Matches:</b>{" "}
                      {attrs.remainingMatchesUntilLastInsulinUseExpiration
                        ? attrs.remainingMatchesUntilLastInsulinUseExpiration
                        : "Infinate"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {slides.length > 1 && (
          <div
            style={{ marginTop: "1rem" }}
            className="flex-align-center flex-justify-center list-spacing-med"
          >
            <button onClick={scrollPrev}>Back</button>
            <button onClick={scrollNext}>Next</button>
          </div>
        )}
      </div>

      <style jsx>{`
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
          padding: 20px;
          margin-left: auto;
          margin-right: auto;
        }

        .embla__viewport {
          overflow: hidden;
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
          position: relative;
          min-width: 50%;
          padding-left: 10px;
        }

        .embla__slide__inner {
          position: relative;
          padding: 1rem;
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

        .embla__button {
          outline: 0;
          cursor: pointer;
          background-color: transparent;
          touch-action: manipulation;
          position: absolute;
          z-index: 1;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          width: 30px;
          height: 30px;
          justify-content: center;
          align-items: center;
          fill: #1bcacd;
          padding: 0;
        }

        .embla__button:disabled {
          cursor: default;
          opacity: 0.3;
        }

        .embla__button__svg {
          width: 100%;
          height: 100%;
        }

        .embla__button--prev {
          left: 27px;
        }

        .embla__button--next {
          right: 27px;
        }
      `}</style>
    </>
  );
};

export default EmblaCarousel;
