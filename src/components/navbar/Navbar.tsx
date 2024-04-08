import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyles.css";
interface NavbarProps {
  children: ReactNode;
}
function Navbar({ children }: NavbarProps) {
  const path: string = window.location.pathname;
  return (
    <>
      <div className="navbarMain">
        <a href="/">
          <img src="/logo.png" height={140} width={150} alt="Logo"></img>
        </a>
        <div className="linkButtons">
          <div className="linkButtonStyles">
            <Link
              to="/"
              className={path === "/" ? "isActiveLink" : "removeTextDecoration"}
            >
              Home
            </Link>
          </div>
          <div className="linkButtonStyles">
            <Link
              to="/favourites"
              className={
                path === "/favourites" ? "isActiveLink" : "removeTextDecoration"
              }
            >
              Favourites
            </Link>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}

export default Navbar;
