import Loader from "comps/Loader";
import Link from "next/link";
import { useRouter } from "next/router";

import Modal from "comps/Modal";
import Offer from "comps/Offer";

export default function Comp({
  data,
  hook,
  loading,
  placeholder = "No Items",
}) {
  let router = useRouter();
  return (
    <div>
      {router.query.id && (
        <Modal onClose={() => router.push(router.pathname)}>
          <Offer id={router.query.id} nftId="1234" />
        </Modal>
      )}
      {loading && <Loader />}
      {!loading &&
        (data.length ? (
          <pre>
            {data.map((item, i) => (
              <Link
                href={`${router.pathname !== "/" ? router.pathname : ""}/?id=${
                  item.id
                }`}
                as={`offer/${item.id}`}
              >
                <a>
                  <p>
                    link:
                    {`${router.pathname !== "/" ? router.pathname : ""}/?id=${
                      item.id
                    }`}
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
