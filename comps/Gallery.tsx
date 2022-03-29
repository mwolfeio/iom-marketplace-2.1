// @ts-nocheck
import Loader from "comps/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "lib/useUser";
import React, { useState, useEffect } from "react";

import Modal from "comps/Modal";
import Asset from "comps/Asset";
import Offer from "comps/Offer";
import CharGalleryItem from "comps/CharGalleryItem";
import ItemGalleryItem from "comps/ItemGalleryItem";
import BoxGalleryItem from "comps/BoxGalleryItem";

export default function Comp({
  data,
  hook,
  loading,
  type = "offer",
  placeholder = "No Items",
  filter = [],
  title,
  wallet = false,
}) {
  const { user } = useUser();
  const router = useRouter();
  const getHref = (item) => {
    const href =
      type === "asset"
        ? `wallet?id=${item.id}`
        : `${router.pathname !== "/" ? router.pathname : ""}/?id=${item.id}`;
    return href;
  };
  const getComp = (cat, item) => {
    switch (cat) {
      case "BOX":
        return <BoxGalleryItem data={item} />;
        break;

      case "GAME_ITEM":
        return <ItemGalleryItem data={item} />;
        break;
      default:
        return (
          <CharGalleryItem
            data={item}
            wallet={wallet}
            owned={
              user &&
              user.isLoggedIn &&
              user.info.id ===
                (item.ownerUserId ? item.ownerUserId : item.userId)
            }
          />
        );
        break;
    }
  };

  return (
    <>
      {router.query.id && (
        <Modal onClose={() => router.push(router.pathname)} background={false}>
          {type === "offer" && (
            <Offer
              id={router.query.id}
              href={router.pathname}
              onClose={() => router.push(router.pathname)}
            />
          )}
          {type === "asset" && (
            <Asset
              data={data.find((obj) => obj.id === router.query.id)}
              onClose={() => router.push(router.pathname)}
              hook={hook}
            />
          )}
        </Modal>
      )}

      <div className="gallery-wrapper">
        {loading ? (
          <div className="placeholder-wrapper flex-align-center flex-justify-center">
            <Loader />
          </div>
        ) : data.length ? (
          data.map((item, i) => (
            <Link
              key={item.id}
              href={getHref(item)}
              as={
                type === "offer"
                  ? `/offer/${item.id}`
                  : `/wallet/?id=${item.id}`
              }
            >
              <a>{getComp(item.tokenCategory, item)}</a>
            </Link>
          ))
        ) : (
          <div className="placeholder-wrapper flex-align-center flex-justify-center">
            {placeholder}
          </div>
        )}
      </div>

      <style jsx>{`
        .gallery-wrapper {
          border-radius: 1rem;
          width: 100%;
          min-height: 420px;
          padding: 24px;
          background: #ffffff10;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 1rem;
        }
        .gallery-wrapper > * {
          width: 100%;
        }
        .placeholder-wrapper {
          text-align: center;
          color: #ffffff30;
          font-size: 40px;
          font-weight: 700;
        }

        @media (min-width: 768px) {
          .gallery-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
          .placeholder-wrapper {
            grid-column: 1 / span 2;
          }
        }
        @media (min-width: 1025px) {
          .gallery-wrapper {
            grid-template-columns: repeat(3, 1fr);
          }
          .placeholder-wrapper {
            grid-column: 1 / span 3;
          }
        }
      `}</style>
    </>
  );
}
