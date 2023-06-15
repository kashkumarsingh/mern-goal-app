//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = async (req, res) => {
  try {
    res.status(200).json({ message: "Goals" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//@desc Create goal
//@route POST /api/goals
//@access Private
const createGoal = async (req, res) => {
  try {
    const {text} = req.body;
    if(!text) {
       res.status(400);
       throw new Error("Please add a text field");
    }
    res.status(200).json({ message: "Goal set" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = async (req, res) => {
  try {
    res.status(200).json({ message: `Goal update for ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = async (req, res) => {
  try {
    res.status(200).json({ message: `Goal deleted for ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createGoal, getGoals, updateGoal, deleteGoal };
