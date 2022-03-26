import Link from "next/link";

export default function Comp({ data }) {
  return (
    <>
      <p>
        <b>IOM (number)</b>
      </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="list-spacing-sml flex-align-center">
        <Link href="/wallet/deposit">
          <a>
            <button className="turciary">Deposit</button>
          </a>
        </Link>
        <Link href="/wallet/withdraw">
          <a>
            <button className="turciary">Withdraw</button>
          </a>
        </Link>
        <a>
          <button className="primary">Get More</button>
        </a>
      </div>
    </>
  );
}
