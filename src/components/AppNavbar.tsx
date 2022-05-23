import React from "react";

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";
import { useAppSelector } from "../features/app/hooks";

const AppNavbar = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Kite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle>
                  <Image height={"36px"} src={user?.avatar} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1">logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
