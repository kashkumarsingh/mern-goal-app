import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
const GoalForm = ({
  onSubmit,
  formData,
  onChange,
  isEditing,
  isLoading,
  onCancelEdit,
}) => {
  return (
    <>
      <Form
        className="d-flex flex-column align-items-center justify-content-center"
        onSubmit={onSubmit}
      >
        <Form.Group className="mb-3" controlId="formGoal">
          <Form.Label>Create Your Goal*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your goal here"
            name="text"
            value={formData.text}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          {isLoading ? "Loading..." : isEditing ? "Update" : "Add Goal"}
        </Button>
        {isEditing && (
          <Button variant="secondary" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

GoalForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
};
export default GoalForm;
