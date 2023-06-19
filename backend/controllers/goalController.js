import goalModel from "../models/goalModel.js";
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = async (req, res) => {
  try {
    const goals = await goalModel.find({ user: req.user._id });

    if (goals.length > 0) {
      res.status(200).json({ goals, message: "Goals" });
    } else {
      res.status(404).json({ message: "No goals found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve goals. Please try again later." });
  }
};

//@desc Create goal
//@route POST /api/goals
//@access Private
const createGoal = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400);
      throw new Error("Please add a text field");
      //   return res.status(400).json({ error: "Please add a text field" });
    }
    // const goal = await goalModel.create({ text });
    const goal = new goalModel({ text, user: req.user._id });
    await goal.save();

    res.status(201).json({ goal, message: "Goal created" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create goal. Please try again later." });
  }
};

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Find the goal by ID and update its text
    const updatedGoal = await goalModel.findByIdAndUpdate(
      { _id: id, user: req.user._id },
      { text },
      { new: true, runValidators: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json({ goal: updatedGoal, message: "Goal updated" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update goal. Please try again later." });
  }
};

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    //Find the goal by ID and delete its text
    const deletedGoal = await goalModel.findByIdAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deletedGoal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json({ id, message: "Goal deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete goal. Please try again later." });
  }
};

export { createGoal, getGoals, updateGoal, deleteGoal };
