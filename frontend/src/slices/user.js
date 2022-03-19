import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import UserService from "../services/user.service";

export const userhome = createAsyncThunk(
  "user/home",
  async (thunkAPI) => {
    try{
      const response = await UserService.getUserHome();
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
});

export const userprofile = createAsyncThunk(
  "user/profile",
  async (thunkAPI) => {
    try{
      const response = await UserService.getUserProfile();
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
});

export const createprofile = createAsyncThunk(
  "user/createprofile",
  async ({ name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber }, thunkAPI) => {
    try {
      const response = await UserService.createUserProfile(name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber);
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

export const updateprofile = createAsyncThunk(
  "user/updateprofile",
  async ({ name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber }, thunkAPI) => {
    try {
      const response = await UserService.updateUserProfile( name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber );
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

export const userdelete = createAsyncThunk(
  "user/delete",
    async (thunkAPI) => {
    try{
      const response = await UserService.deleteUser();
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
});

export const userpurchases = createAsyncThunk(
  "user/purchases",
  async (thunkAPI) => {
    try{
      const response = await UserService.getUserPurchases();
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
});


const initialState = { 
  userProfileExists: false,
  userDeleted: false 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [userhome.fulfilled]: (state, action) => {
      state.userhome = false;
    },
    [userhome.rejected]: (state, action) => {
      state.userhome = false;
    },
    [createprofile.fulfilled]: (state, action) => {
      state.userProfileExists = true;
    },
    [createprofile.rejected]: (state, action) => {
      state.userProfileExists = false;
    },
    [userdelete.fulfilled]: (state, action) => {
      state.userDeleted = true;
      state.userProfileExists = false;
    },
  },
});

const { reducer } = userSlice;
export default reducer;