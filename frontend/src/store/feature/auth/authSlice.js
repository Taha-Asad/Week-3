import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserInfoFromLocalStorage = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserInfoFromLocalStorage,
  status: "idle",
  error: null,
};
// This will be used in login Form
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});
// This will be used in store.js file in auth reduces
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increamentByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload;
      });
  },
});
export const { increamentByAmount } = authSlice.actions;
export default authSlice.reducer;
