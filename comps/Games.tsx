// @ts-nocheck

import GameTile from "comps/GameTile";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        .game-wrapper {
          margin: 1rem auto;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .game-wrapper h1 {
          margin-top: 2rem;
          text-align: center;
          opacity: 0.3;
        }
      `}</style>
      <div className="game-wrapper">
        <GameTile />
        <h1>More Games Coming Soon</h1>
      </div>
    </>
  );
}
