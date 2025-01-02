// src/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUserDto } from "@/services/users/dto/createUserDto";

interface UserState {
  user: CreateUserDto | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CreateUserDto>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<CreateUserDto>) => {
      if (state.user && state.user.email === action.payload.email) {
        state.user = action.payload;
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
