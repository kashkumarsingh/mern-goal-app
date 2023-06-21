import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get goals of the user that is currently logged in
export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/goals/");
      return response.data.goals;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//Add a goal
export const addGoal = createAsyncThunk(
  "goals/addGoal",
  async (goalFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/goals/", goalFormData);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//Update goal
export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/goals/${id}`, { text });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//removeGoal
export const removeGoal = createAsyncThunk(
  "goals/removeGoal",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/goals/${id}`);
      return id;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);
const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload.goal);
        state.message = action.payload.message;
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedGoal = action.payload;
        state.goals = state.goals.map((goal) => goal._id === updatedGoal._id ? updatedGoal : goal);
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(removeGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        const goalId = action.payload;
        state.goals = state.goals.filter((goal) => goal._id !== goalId);
        state.isSuccess = true;
      })
      .addCase(removeGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;

/**
 * const index = state.goals.findIndex((goal) => goal._id === updateGoal._id);
    if (index !== -1) {
      state.goals[index] = updatedGoal;
    }
 */