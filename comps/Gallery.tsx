// @ts-nocheck
import Loader from "comps/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "lib/useUser";

import Modal from "comps/Modal";
import Asset from "comps/Asset";
import Offer from "comps/Offer";
import CharGalleryItem from "comps/CharGalleryItem";

export default function Comp({
  data,
  hook,
  loading,
  type = "offer",
  placeholder = "No Items",
}) {
  const router = useRouter();
  const { user } = useUser();

  const getHref = (item) => {
    const href =
      type === "asset"
        ? `wallet?id=${item.id}`
        : `${router.pathname !== "/" ? router.pathname : ""}/?id=${item.id}`;
    return href;
  };

  return (
    <>
      {router.query.id && (
        <Modal onClose={() => router.push(router.pathname)}>
          {type === "offer" && <Offer id={router.query.id} />}
          {type === "asset" && (
            <Asset data={data.find((obj) => obj.id === router.query.id)} />
          )}
        </Modal>
      )}
      {loading && <Loader />}

      {!loading && (
        <div className="gallery-wrapper">
          {data.length ? (
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
                <a>
                  <CharGalleryItem
                    data={item}
                    owned={
                      user &&
                      user.info.id ===
                        (item.ownerUserId ? item.ownerUserId : item.userId)
                    }
                  />
                </a>
              </Link>
            ))
          ) : (
            <p>{placeholder}</p>
          )}
        </div>
      )}

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
        @media (min-width: 768px) {
          .gallery-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1025px) {
          .gallery-wrapper {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </>
  );
}
