import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../services/apiServices";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  image: string;
}

interface AuthState {
  userInfo: AuthResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    if (!username?.trim()) {
      return rejectWithValue(`Please enter username`);
    }
    if (!password?.trim()) {
      return rejectWithValue(`Please enter password`);
    }
    try {
      const response = await fetch(`${API_BASE_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginAsAdmin = createAsyncThunk(
  "/api/admin/users",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    if (!email?.trim()) {
      return rejectWithValue(`Please enter email`);
    }
    if (!password?.trim()) {
      return rejectWithValue(`Please enter password`);
    }
    try {
      const response = await fetch(`${API_BASE_URL}api/admin/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const apiRes = await response.json();
      if (apiRes?.data) {
        console.log(apiRes, "datt000000");
        localStorage.setItem("userInfo", JSON.stringify(apiRes?.data));
        return apiRes;
      } else {
        return apiRes;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsAdmin.fulfilled, (state, action) => {
        console.log(state,action,"actionnnnnnnnnn")
        state.userInfo = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(loginAsAdmin.rejected, (state, action:any) => {
        debugger;
        state.isLoading = false;
        state.error = action.payload?.error as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
