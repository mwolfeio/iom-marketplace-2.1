import { FormEvent } from "react";

export default function Form({
  errorMessage,
  onSubmit,
  children,
}: {
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="vert-space-sml">
      {children}
      {errorMessage && <p className="error-wrapper">⛔ {errorMessage}</p>}
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        .error-wrapper {
          color: red;
          line-height: 1.25;
          padding: 0.5rem 0.75rem;
          border-width: 1px;
          border-radius: 0.25rem;
          outline-offset: -2px;
          margin-bottom: 0.5rem;
          border: 1px solid red;
          min-height: 38px;
          background: rgba(255, 0, 0, 0.1);
          outline: none;
          transition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
          font-size: 1rem;
          width: 100%;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}
