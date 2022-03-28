// @ts-nocheck
import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

const NavLink = ({ href, exact, children, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return (
    <>
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
      <style jsx>{`
        a {
          color: #ffffff60;
          transition: 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        a.active,
        a:hover {
          color: #fff;
        }
      `}</style>
    </>
  );
};
export default NavLink;
