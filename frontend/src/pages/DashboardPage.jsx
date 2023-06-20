import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <Container>
        <Row>
          <Col xs={12}>
            <Form
              className="d-flex flex-column align-items-center justify-content-center"
              onSubmit={() => {}}
            >
              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Create Your Goal*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter you goal here"
                  name="name"
                  value={""}
                  onChange={()=>{}}
                />
              </Form.Group>
              {/* Name */}
              <Button type="submit" variant="primary">
                Create Goal
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default DashboardPage;
