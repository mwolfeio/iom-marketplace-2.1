import Loader from "comps/Loader";
import Link from "next/link";
import { useRouter } from "next/router";

import Modal from "comps/Modal";
import Asset from "comps/Asset";
import Offer from "comps/Offer";

export default function Comp({
  data,
  hook,
  loading,
  type = "offer",
  placeholder = "No Items",
}) {
  const router = useRouter();

  const getHref = (item) => {
    const href =
      type === "asset"
        ? `wallet?id=${item.id}`
        : `${router.pathname !== "/" ? router.pathname : ""}/?id=${item.id}`;
    return href;
  };

  return (
    <div>
      {router.query.id && (
        <Modal onClose={() => router.push(router.pathname)}>
          {type === "offer" && <Offer id={router.query.id} />}
          {type === "asset" && (
            <Asset data={data.find((obj) => obj.id === router.query.id)} />
          )}
        </Modal>
      )}
      {loading && <Loader />}
      {!loading &&
        (data.length ? (
          <pre>
            {data.map((item, i) => (
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
                  <p>
                    link:
                    {getHref(item)}
                  </p>
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </a>
              </Link>
            ))}
          </pre>
        ) : (
          <p>{placeholder}</p>
        ))}
    </div>
  );
}
