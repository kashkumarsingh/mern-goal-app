import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice.js";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const message = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission using dispatch
    dispatch(registerUser(formData));
    setFormData({ name: "", email: "", password: "" });
  };

  useEffect(() => {
    if (error || message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // Hide the message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error, message]);

  return (
    <div className="register">
      <Container>
        <Row>
          <Col xs={12}>
            {showMessage && (
              <div className="message text-center">
                {/* {loading && <div>Loading...</div>} */}
                {error && <div className="error">{error.error}</div>}
                {message && <div className="success">{message.message}</div>}
              </div>
            )}
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* Name */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* Email */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* Password */}
              <Button type="submit" variant="primary">
                {loading ? "loading..." : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="register-box text-center">
              Already have an account?{" "}
              <Link to="/login">
                <Button type="button" variant="primary">
                  Login
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
