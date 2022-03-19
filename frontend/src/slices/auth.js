import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));


export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.signUp(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.signIn(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  await AuthService.signOut();
});

const initialState = user
  ? { isSignedIn: true, user }
  : { isSignedIn: false, user: null };



const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isSignedIn = false;
    },
    [signup.rejected]: (state, action) => {
      state.isSignedIn = false;
    },
    [signin.fulfilled]: (state, action) => {
      state.isSignedIn = true;
      state.user = action.payload.user;
    },
    [signin.rejected]: (state, action) => {
      state.isSignedIn = false;
      state.user = null;
    },
    [signout.fulfilled]: (state, action) => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;