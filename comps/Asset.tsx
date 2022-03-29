// @ts-nocheck
import { useEffect, useState, FormEvent } from "react";
import useUser from "lib/useUser";

import CreateOffer from "comps/CreateOffer";
import BreadCrumbs from "comps/BreadCrumbs";
import Link from "next/link";
import Image from "next/image";
import Platform from "assets/media/platform.png";
import Back from "assets/media/asset_back.png";
import Media from "comps/MediaManager";
import Loader from "comps/Loader";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Comp({ data, onClose, path, children }) {
  const [owned, setOwned] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (data && user.isLoggedIn) {
      setOwned(user.info.id === data.ownerUserId);
    }
  }, [user, data]);

  if (!data) return <Loader />;
  return (
    <>
      <div>
        <div className="flex-justify-btw">
          <BreadCrumbs
            icon={false}
            hook={onClose}
            buttonText="Close"
            path={[path, data.token]}
          />
          <div className="wallet-wrapper flex-align-center">
            <Link href="/wallet">
              <a>
                <span style={{ color: "rgb(255, 206, 56)" }}>
                  {numberWithCommas(user.iom)} $IOM{" "}
                </span>
                <span> Wallet</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="asset-wrapper">
          <div>
            <div className="asset-meda-cont">
              <Image src={Back} width="700px" height="700px" />
              <div className="asset-plat-wrap">
                <Image src={Platform} width="700px" height="211px" />
              </div>
              <div className="asset-img-wrap">
                {data.images && data.images[0] ? (
                  <Image src={data.images[0]} width="700px" height="700px" />
                ) : (
                  <Media
                    className="char-img"
                    type={data.tokenCategory}
                    token={data.token}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="asset-content-wrap">
              <pre>{JSON.stringify(data, null, 2)}</pre>
              {children}
              <CreateOffer show={owned} data={data} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .asset-plat-wrap {
          position: absolute;
          bottom: 0;
        }
        .asset-content-wrap {
          position: relative;
          padding: 1rem;
          background: #242830;
          border: 10px solid #fff9e1;
          box-sizing: border-box;
          box-shadow: 0 10px 0 #828282, 0 10px 0 2px #fff,
            0 12px 24px 10px hsl(0deg 0% 100% / 25%);
          border-radius: 30px;
        }
        .asset-img-wrap {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .asset-meda-cont {
          position: relative;
        }
        .asset-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 1rem;
        }
        .asset-wrapper > * {
          position: relative;
        }
        .wallet-wrapper {
          height: 40px;

          transition: 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
          background: #ffffff00;
          border-radius: 50px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0 1rem;
        }
        .wallet-wrapper:hover {
          background: #ffffff10;
        }
        .wallet-wrapper a {
          color: white;
        }

        .wallet-wrapper a > *:first-child::after {
          content: "";
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          height: 24px;
          margin: 0 1rem;
        }
        @media (min-width: 768px) {
          .asset-wrapper {
            grid-template-columns: 1fr 1fr;
            grid-gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
