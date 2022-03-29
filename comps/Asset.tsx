// @ts-nocheck
import { useEffect, useState, FormEvent } from "react";
import useUser from "lib/useUser";
import moment from "moment";

import CreateOffer from "comps/CreateOffer";
import BreadCrumbs from "comps/BreadCrumbs";
import Link from "next/link";
import Image from "next/image";
import Platform from "assets/media/platform.png";
import Back from "assets/media/asset_back.png";
import Media from "comps/MediaManager";
import Loader from "comps/Loader";
import SkyImg from "assets/media/skyzao_logo.png";

function numberWithCommas(x = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getDate = (utcSeconds) => {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);

  return moment(d).format("MMM Do YY, h:mm:ss a");
};

const getAttributes = (attrb, token, type) => {
  switch (token) {
    case "GORDOLA":
      return (
        <>
          <div className="flex-justify-btw list-spacing-sml">
            <span>Skin Code</span>
            <div className="div-lin" />
            <span>{attrb.skinCode}</span>
          </div>
          <div className="flex-justify-btw list-spacing-sml">
            <span>Points Coefficient</span>
            <div className="div-lin" />
            <span>{attrb.pointsCoefficient}</span>
          </div>
          <div className="flex-justify-btw list-spacing-sml">
            <span>Last Insulin Use</span>
            <div className="div-lin" />
            <span>{getDate(attrb.lastInsulinUseExpiration)}</span>
          </div>
          <div className="flex-justify-btw list-spacing-sml">
            <span>Matches until next shot</span>
            <div className="div-lin" />
            <span>{attrb.remainingMatchesUntilLastInsulinUseExpiration}</span>
          </div>{" "}
          <div className="flex-justify-btw list-spacing-sml">
            <span>Time of hear attack</span>
            <div className="div-lin" />
            <span>{getDate(attrb.heartAttackTime)}</span>
          </div>
          <style jsx>
            {`
              span {
                white-space: nowrap;
              }
              div {
                padding: 0.5rem 0;
              }
              div > *:first-child {
                font-weight: 600;
                opacity: 0.6;
              }
              .div-lin {
                width: 100%;
                border-bottom: 1px solid #ffffff10;
              }
            `}
          </style>
        </>
      );

      break;

    default:
      <div>No Info</div>;
      break;
  }
};

export default function Comp({
  data,
  onClose,
  path,
  children,
  hook,
  hideHeader = false,
}) {
  const [owned, setOwned] = useState("");
  const { user } = useUser();

  useEffect(() => {
    console.log("DATAAAAA: ", data);

    if (data && user.isLoggedIn) {
      setOwned(user.info.id === data.ownerUserId);
    }
  }, [user, data]);

  if (!data) return <Loader />;
  return (
    <>
      <div>
        {!hideHeader && (
          <>
            <div className="flex-justify-btw asset-header">
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
          </>
        )}
        <div className="asset-wrapper">
          <div>
            <div className="asset-meda-cont">
              <Image src={Back} width="700px" height="700px" />
              <div className="char-game-badge">
                <Image className="char-img" src={SkyImg} layout="fill" />
              </div>
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
              {children ? (
                children
              ) : (
                <div
                  className="vert-space-med"
                  style={{ paddingBottom: "1rem" }}
                >
                  <div>
                    <div className="flex-align-center flex-justify-btw">
                      <h1>
                        {data.token}{" "}
                        {data.tokenType === "NON_FUNGIBLE" && (
                          <span style={{ opacity: 0.3 }}>(NFT)</span>
                        )}
                      </h1>
                    </div>
                    <p>ID: {data.id}</p>
                  </div>

                  <div className="attributes-wrapper">
                    {getAttributes(data.attrs, data.token)}
                  </div>
                </div>
              )}
              <CreateOffer show={owned} data={data} hook={hook} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .char-game-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          height: 55px;
          width: 120px;
        }

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
        .price-button {
          border-radius: 50px;
          width: 100%;
          border: 2px solid #fff;
          color: #fff;
        }
        .attributes-wrapper {
          border-radius: 1rem;
          background: #ffffff10;
          padding: 1rem;
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
