import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const message = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (error || message) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2500); // Hide the message after 5 seconds

      dispatch(reset());

      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can call your login API or dispatch an action to handle the login process
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <Container>
        <Row>
          <Col xs={12}>
            {showMessage && (
              <div className="message text-center">
                {/* {loading && <div>Loading...</div>} */}
                {error && (
                  <div className="error text-bg-red-700">{error.error}</div>
                )}
                {message && (
                  <div className="success text-bg-green-700">
                    {message.message}
                  </div>
                )}
              </div>
            )}
            <Form
              className="d-flex flex-column align-items-center justify-content-center"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {/* Email */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {/* Password */}
              <Button type="submit" variant="primary">
                {loading ? "loading..." : "Log In"}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="register-box text-center">
              Create an account?{" "}
              <Link to="/register">
                <Button type="button" variant="primary">
                  Register
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
