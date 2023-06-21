import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
const GoalTable = ({ goals, isLoading, onRemoveGoal, onEditGoal }) => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Created At:</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : goals.length > 0 ? (
            goals.map((goal) => (
              <tr key={goal._id}>
                <td>{goal.text}</td>
                <td>{new Date(goal.createdAt).toLocaleDateString("en-GB")}</td>
                <td>
                  <Button
                    variant="danger"
                    className="text-left"
                    onClick={() => onRemoveGoal(goal._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    className="text-white"
                    onClick={() => onEditGoal(goal._id, goal.text)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No goals found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

GoalTable.propTypes = {
  goals: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onRemoveGoal: PropTypes.func.isRequired,
  onEditGoal: PropTypes.func.isRequired,
};
export default GoalTable;
