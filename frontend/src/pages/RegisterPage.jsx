import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error: " + message);
    }
    if (isSuccess) {
      toast.success("Sucess: ", +message);
    }
    if (user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are mandatory");
      return;
    }
    // Handle form submission using dispatch
    dispatch(registerUser(formData));
    // navigate("/");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="register d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row>
          <Col xs={12}>
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Name */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Email */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Password */}
              <Button type="submit" variant="primary">
                {isLoading ? "loading..." : "Submit"}
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
