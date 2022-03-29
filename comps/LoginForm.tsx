// @ts-nocheck
import Link from "next/link";
import Loader from "comps/Loader";

export default function Form({ loading }) {
  return (
    <>
      <h1 style={{ margin: 0 }}>Welcome!</h1>
      <p>
        Sign in to access the IOM Marketplace or create a new account{" "}
        <Link href="/sign-up">
          <a>here</a>
        </Link>
        .
      </p>
      <label>
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
      <Link href="/forgot">
        <a>Forgot password?</a>
      </Link>
      <div className="form-button-wapper flex-align-center list-spacing-sml">
        <Link href="/sign-up">
          <a>
            <button type="button">Sign up</button>
          </a>
        </Link>
        <button type="submit" className="primary">
          {loading ? <Loader /> : "Sign in"}
        </button>
      </div>
      <style jsx>{`
        label > span {
          font-weight: 600;
        }
        .form-button-wapper {
          width: 100%;
        }
        .form-button-wapper > *,
        .form-button-wapper button {
          display: block;
          width: 100%;
        }
      `}</style>
    </>
  );
}
