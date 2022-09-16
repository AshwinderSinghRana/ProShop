import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../REDUX/actions/userAction";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavLink
            style={{
              color: "whitesmoke",
              fontSize: "1.2rem",
              textDecoration: "none",
            }}
            to={"/"}
          >
            ProShop
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>
                      <i className="fa-solid fa-user-tie"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={(e) => dispatch(logoutHandler())}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to={"/admin/userlist"}>
                    <NavDropdown.Item>
                      <i className="fa-solid fa-user-plus"></i>Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/productlist"}>
                    <NavDropdown.Item>
                      <i className="fa-solid fa-box-open"></i> Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/admin/orderlist"}>
                    <NavDropdown.Item>
                      <i className="fa-brands fa-first-order"></i> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
