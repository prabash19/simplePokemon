import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyles.css";
interface NavbarProps {
  children: ReactNode;
}
function Navbar({ children }: NavbarProps) {
  const path: string = window.location.pathname;
  return (
    <div>
      <div className="navbarMain">
        <div>logo</div>
        <div className="linkButtons">
          <Link to="/" className={path == "/" ? "isActiveLink" : "linkStyle"}>
            Home
          </Link>
          <Link
            to="/favourites"
            className={path == "/favourites" ? "isActiveLink" : "linkStyle"}
          >
            favourites
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Navbar;
