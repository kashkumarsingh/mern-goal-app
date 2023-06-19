import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Register a new user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Login a user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/*
The ThunkAPI object provided by Redux Toolkit contains several useful values and functions that can be used within async thunks:
dispatch: A function to dispatch actions.
getState: A function to access the current state of the Redux store.
extra: Additional data or dependencies that can be passed to the async thunk.
rejectWithValue: A function to reject the async thunk with a specific value, which can be used to handle errors and provide custom error payloads.
*/

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state)=> {
         state.loading = true;
         state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action)=> {
         state.loading = false;
         state.user = action.payload;
         state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      })

  },
});

export default authSlice.reducer;
