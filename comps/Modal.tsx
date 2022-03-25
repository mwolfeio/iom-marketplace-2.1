import { FormEvent } from "react";

export default function Modal({ id, onClose, children }) {
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
          width: 100vw;
          height: 100vh;
          background: #00000080;
        }
        .modal-wrap {
          position: relative;
          inset: 2rem;
          color: #fff;
          width: Calc(100vw - 4rem);
          max-height: Calc(100vh - 4rem);
          overflow-y: auto;
          box-sizing: border-box;
          border-radius: 2rem;
          background: #242830;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
