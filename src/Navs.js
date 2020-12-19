import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
function Navs() {
  return (
    <Navbar variant="dark" bg="primary" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Data recieved from:{" "}
            <a href="https://openaq.org/#/?_k=da5806">Open Aq</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;
