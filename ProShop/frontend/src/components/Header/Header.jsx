import React from "react";
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
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
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="px-3">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink
                className="px-3"
                to="/cart"
                style={{
                  color: "darkgray",
                  textDecoration: "none",
                }}
              >
                <i class="fa-solid fa-cart-arrow-down"></i>Cart
              </NavLink>
              <NavLink
                className="px-3"
                to="/signup"
                style={{
                  color: "darkgray",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </NavLink>
              <NavLink
                className="px-3"
                to="/login"
                style={{
                  color: "darkgray",
                  textDecoration: "none",
                }}
              >
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
