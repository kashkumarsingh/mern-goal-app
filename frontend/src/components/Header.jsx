import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser, reset } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    dispatch(reset());
  };
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
                {user ? (
                  <>
                    <button className="btn btn-primary" onClick={handleLogout} type="button">Logout</button>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default Header;
