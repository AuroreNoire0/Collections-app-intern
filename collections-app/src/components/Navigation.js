import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className={styles.navContainer}>
        <Navbar.Brand href="/" className={styles.navbrand}>
          Collection App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/account">Account</Nav.Link>
            <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="login"
                className="px-4"
                style={{ fontSize: 20 }}
              >
                Log In
              </NavDropdown.Item>
              <NavDropdown.Item
                href="register"
                className="px-4"
                style={{ fontSize: 20 }}
              >
                Register
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
