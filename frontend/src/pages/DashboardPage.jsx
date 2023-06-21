import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import GoalForm from "../components/GoalForm";
import GoalTable from "../components/GoalTable";
import { toast } from "react-toastify";
import {
  addGoal,
  reset,
  fetchGoals,
  removeGoal,
  updateGoal,
} from "../features/goal/goalSlice.js";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message, goals} = useSelector((state) => state.goal);
  const [formData, setFormData] = useState({
    text: "",
  });

  const [editGoalId, setEditGoalId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(fetchGoals()); // Fetch goals when the component mounts
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Success: ${message}`);
      setEditGoalId(null);
      setFormData({ text: "" });
      dispatch(fetchGoals()); // Manually refresh the goals list after a successful update
    }
    if (isError) {
      toast.error(`Error: ${message}`);
    }
  }, [isSuccess, isError, message, dispatch]);


  const handleRemoveGoal = (goalId) => {
    dispatch(removeGoal(goalId));
  };
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateGoal({ id: editGoalId, text: formData.text }));
      setFormData({ text: "" });
      setEditGoalId(null);
    } else {
      dispatch(addGoal(formData));
      setFormData({ text: "" });
    }
  };

  return (
    <div className="goal-dashboard">
      <Container>
        <Row>
          <Col xs={12}>
            <GoalForm
              onSubmit={handleSubmit}
              formData={formData}
              onChange={handleInputChange}
              onCancelEdit={handleCancelEdit}
              isLoading={isLoading}
              isEditing={isEditing}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <GoalTable
              goals={goals}
              isLoading={isLoading}
              onEditGoal={handleEditGoal}
              onRemoveGoal={handleRemoveGoal}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default DashboardPage;
