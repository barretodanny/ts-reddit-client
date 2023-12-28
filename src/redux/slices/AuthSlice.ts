import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateSessionInput, User } from "../../types/types";
import { createSession, getLoggedInUser } from "../../api";

export interface AuthState {
  loggedInUser: User | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: "";
}

const initialState: AuthState = {
  loggedInUser: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (payload: CreateSessionInput, thunkAPI) => {
    try {
      await createSession(payload);
      return (await getLoggedInUser()).data; // change getLoggedInUser to return response.data, makes this cleaner
    } catch (error: any) {
      // grab the error message and reject with this value
      const message = Array.isArray(error.response.data)
        ? error.response.data[0].message
        : error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Auth User
export const getAuthUser = createAsyncThunk("auth/getAuthUser", async () => {
  try {
    return (await getLoggedInUser()).data;
  } catch (error: any) {
    // error fetching logged in user
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: any) => {
        state.loggedInUser = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAuthUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAuthUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loggedInUser = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
