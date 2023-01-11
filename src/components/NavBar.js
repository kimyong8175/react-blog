import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../store/authSlice";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

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
            <button
              className="text-white btn btn-link text-decoration-none px-0"
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(logOut());
                } else {
                  dispatch(logIn());
                }
              }}
            >
              {isLoggedIn ? "Logout" : "logIn"}
            </button>
          </li>
          {isLoggedIn ? (
            <li className="nav-item me-2">
              <NavLink
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                aria-current="page"
                to="/admin"
              >
                Admin
              </NavLink>
            </li>
          ) : null}

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
