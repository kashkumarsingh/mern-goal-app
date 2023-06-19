import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <div className="header">
      <div className="header__inner">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <NavbarBrand>Logo</NavbarBrand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="app-navigation" />
            <Navbar.Collapse
              className="d-flex justify-content-end"
              id="app-navigation"
            >
              <Nav className="d-flex justify-content-end">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default Header;
