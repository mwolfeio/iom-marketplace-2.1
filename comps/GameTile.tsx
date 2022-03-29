// @ts-nocheck
import Image from "next/image";

import Background from "assets/media/skyzao_background.png";
import Logo from "assets/media/skyzao_logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="game-wrapper">
        <div className="back-wrap">
          <Image src={Background} layout="fill" />
        </div>
        <div className="title-wrapper">
          <div className="title-image">
            <Image src={Logo} layout="fill" />
          </div>
          <div className="flex-align-center list-spacing-med">
            <a target="_blank" href="https://influencersofthemetaverse.com/">
              <button className="white">Learn More</button>
            </a>
            <button className="primary">Play now</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .game-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
          border: 4px solid white;
          border-radius: 1rem;
        }
        .back-wrap {
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .game-wrapper:hover .back-wrap {
          transform: scale(1.1);
        }
        .title-wrapper {
          position: absolute;
          right: 50%;
          transform: translateX(50%);
          top: 0;
          width: 100%
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-bottom: 0;
        }
        .title-image {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 45.82%;
          margin-bottom: 1rem;
        }

        @media (min-width: 600px) {
          .title-wrapper {
            position: absolute;
            right: 0;
            top: 0;
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-bottom: 10%;
            transform: none;
          }
          .title-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 45.82%;
            margin-bottom: 2rem;
          }
        }

      `}</style>
    </>
  );
}
