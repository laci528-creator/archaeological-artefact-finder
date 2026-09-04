import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink to="/" className="logo">
          <img
            src="/favicon.png"
            alt=""
            className="nav-logo"
          />
          <span>Archaeological Artefact Finder</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

