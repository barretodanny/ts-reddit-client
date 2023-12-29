import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateSessionInput, User } from "../../types/types";
import { createSession, deleteSession, getLoggedInUser } from "../../api";

export interface AuthState {
  loggedInUser: User | undefined;
  authFetched: boolean;
  loginSuccess: boolean;
  loginError: boolean;
  loginErrorMessage: "";
}

const initialState: AuthState = {
  loggedInUser: undefined,
  authFetched: false,
  loginSuccess: false,
  loginError: false,
  loginErrorMessage: "",
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

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await deleteSession();
  } catch (error: any) {}
});

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
      state.loggedInUser = undefined;
      state.authFetched = false;
      state.loginError = false;
      state.loginSuccess = false;
      state.loginErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginError = false;
        state.loginErrorMessage = "";
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.loginSuccess = true;
        state.loggedInUser = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loginError = true;
        state.loginErrorMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedInUser = undefined;
      })
      .addCase(getAuthUser.pending, (state) => {
        state.authFetched = false;
      })
      .addCase(getAuthUser.fulfilled, (state, action: any) => {
        state.authFetched = true;
        state.loggedInUser = action.payload;
      })
      .addCase(getAuthUser.rejected, (state) => {
        state.authFetched = true;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
