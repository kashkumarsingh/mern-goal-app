import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error("Error: " + message);
    }
    if(isSuccess){
      toast.success("Success: " + message);
      navigate("/")
    }
    if(user){
       navigate("/dashboard");
    }
    dispatch(reset());
    
  }, [isError, isSuccess, message, user, navigate, dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can call your login API or dispatch an action to handle the login process
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-container login d-flex justify-content-center align-items-center vh-100">
       <div className="form-inner">
       <Container>
        <Row>
          <Col xs={12}>
            <Form
              className="d-flex flex-column align-items-center justify-content-center"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3 w-100" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {/* Email */}
              <Form.Group className="mb-3 w-100" controlId="formPassword">
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
                {isLoading ? "loading..." : "Log In"}
              </Button>
            </Form>
          </Col>
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
    </div>
  );
};

export default LoginPage;
