import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  let activeStyle = {
    color: "#fff",
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>

        <ul
          style={{
            flexDirection: "row",
          }}
          className="navbar-nav"
        >
          <li className="nav-item me-2">
            <NavLink
              className="nav-link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              aria-current="page"
              to="/Admin"
            >
              Admin
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              aria-current="page"
              to="/blogs"
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
