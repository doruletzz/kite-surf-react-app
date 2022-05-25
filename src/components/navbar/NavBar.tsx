import React from "react";

import "./NavBar.scss";

import logoutSrc from "../../assets/logout.svg";

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { unloadToken } from "../../features/auth/slice";
import { removeUser } from "../../features/user/slice";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  return (
    <Navbar className="navbar" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#map">Kite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Item className="profile">
              <Dropdown className="dropdown">
                <Dropdown.Toggle className="toggle shadow-none">
                  <Image
                    className="profile_picture"
                    height={"36px"}
                    src={user?.avatar}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu ">
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(removeUser());
                      dispatch(unloadToken());
                    }}
                  >
                    <span className="item">
                      <img
                        src={logoutSrc}
                        alt="logout"
                        className="logout_icon"
                      ></img>{" "}
                      Logout
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
