// @ts-nocheck
import { FormEvent } from "react";

export default function Modal({
  id,
  noBack,
  onClose,
  children,
  background = true,
}) {
  return (
    <div className="modal-back" onClick={() => onClose()}>
      <div className="modal-wrap" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
      <style jsx>{`
        .modal-back {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          width: 100vw;
          height: 100vh;
          backdrop-filter: blur(4px);
          background: ${background ? "#00000080" : "rgba(0,0,0,.80)"};
        }
        .modal-wrap {
          max-width: 1008px;
          margin: 1rem auto;
          position: relative;
          color: #fff;
          width: Calc(100vw - 1rem);
          max-height: Calc(100vh - 4rem);
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
          border-radius: 1rem;
          background: ${background ? "#242830" : "none"};
          padding: 0.5rem;
        }

        @media (min-width: 768px) {
          .modal-wrap {
            margin: 2.75rem auto;
            width: Calc(100vw - 4rem);
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
