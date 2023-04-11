import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import "./Header.css";

function Header({ logout }) {
  const [userData, setUserData] = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      <div className="header-left">
        <Link to="/" className="mr-auto navbar-brand">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="evangadi logo"
            width="200"
            height="40"
            className="d-inline-block align-top"
          />
        </Link>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto header-right">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/how-it-works">How It Works</Nav.Link>
          <Nav.Item>
            {userData.token ? (
              <button
                className="btn  signin_btn"
                type="submit"
                id="logout"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-outline-success signin_btn" to="/login">
                SIGN IN
              </Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
