// @ts-nocheck
import { useRouter } from "next/router";
import Link from "next/link";

import Chev from "assets/icons/ChevRight";

export default function Comp({ path, buttonText = "Back", icon = true, hook }) {
  const router = useRouter();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div className="list-spacing-med flex-align-center">
        <button
          onClick={() => {
            if (hook) {
              hook();
            } else router.push("/wallet");
          }}
          className={icon ? "icon-text " : ""}
        >
          {icon && (
            <div style={{ transform: "rotate(180deg)" }}>
              <Chev />
            </div>
          )}
          <span>{buttonText}</span>
        </button>

        <div className="breadcrumbs-links list-spacing-sml flex-align-center">
          {path.map((p, i) => {
            if (path.length - 1 !== i) {
              return (
                <Link key={`link-${i}`} href={`/${p}`}>
                  <a>{p}</a>
                </Link>
              );
            } else {
              return <p>{p}</p>;
            }
          })}
        </div>
      </div>
      <style jsx>{`
        .breadcrumbs-links > * {
          text-transform: capitalize;
        }

        .breadcrumbs-links a::after {
          content: "/";
          color: #ffffff30;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}
