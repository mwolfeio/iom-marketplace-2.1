import { FormEvent } from "react";

import Link from "next/link";

export default function Form({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <h3>Welcome!</h3>
        <p>
          Sign in to access the IOM Marketplace or create a new account{" "}
          <Link href="/sign-up">
            <a>here</a>
          </Link>
          .
        </p>
        <input type="email" name="email" placeholder="email" required />
      </label>
      <label>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
      </label>

      <Link href="/sign-up">
        <a>
          <button type="button">Sign Up</button>
        </a>
      </Link>
      <button type="submit">Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  );
}
