import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/Usercontext';

function Header({ logout }) {
  const [userData, setUserData] = useContext(UserContext);

  return (
    <div>
      <section>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand mx-5 px-2" to="/login">
              <img
                src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
                alt="evangadi logo"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    How it works
                  </Link>
                </li>
                <li className="nav-item">
                  {userData.token ? (
                    <button
                      className="btn btn-outline-success signin-button"
                      type="submit"
                      id="logout"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      className="btn btn-outline-success signin-button"
                      to="/login"
                    >
                      SIGN IN
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
}

export default Header;
