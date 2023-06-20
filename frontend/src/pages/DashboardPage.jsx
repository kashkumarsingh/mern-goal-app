import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import {
  addGoal,
  reset,
  fetchGoals,
  updateGoal,
  removeGoal,
} from "../features/goal/goalSlice.js";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading } = useSelector((state) => state.goal);
  const [formData, setFormData] = useState({
    text: "",
  });
  const [editGoalId, setEditGoalId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(fetchGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleEditGoal = (goalId, goalText) => {
    setFormData({ text: goalText });
    setEditGoalId(goalId);
  };

  const handleCancelEdit = () => {
    setFormData({ text: "" });
    setEditGoalId(null);
  };

  const isEditing = editGoalId !== null;

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text) {
      toast.error("Goal field is mandatory");
      return;
    }
    if (isEditing) {
      // Dispatch an action to update the goal
      dispatch(updateGoal({ id: editGoalId, text: formData.text }));
      setFormData({ text: "" });
      setEditGoalId(null);
    } else {
      dispatch(addGoal(formData));
      setFormData({ text: "" });
    }
  };

  return (
    <div className="dashboard">
      <Container>
        <Row>
          <Col xs={12}>
            <Form
              className="d-flex flex-column align-items-center justify-content-center"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formGoal">
                <Form.Label>Create Your Goal*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your goal here"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                {isLoading ? "Loading..." : isEditing ? "Update" : "Add Goal"}
              </Button>
              {isEditing && (
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table striped>
              <thead>
                <tr>
                  <th>Goal Name</th>
                  <th>Created At:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {goals.length > 0 ? (
                  goals.map((goal) => (
                    <tr key={goal._id}>
                      <td>{goal.text}</td>
                      <td>
                        {new Date(goal.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="text-left"
                          onClick={() => dispatch(removeGoal(goal._id))}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          className="text-white"
                          onClick={() => handleEditGoal(goal._id, goal.text)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No such goals</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
