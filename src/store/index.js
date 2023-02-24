import { createSlice, configureStore } from "@reduxjs/toolkit";

const currentUser = createSlice({
  name: "user",
  initialState: {
    currentUsers: [],
  },
  reducers: {
    updateUser: (state, action) => {
      state.currentUsers = action.payload;
    },
  },
});

export const { updateUser } = currentUser.actions;

export const store = configureStore({
  reducer: currentUser.reducer,
});
