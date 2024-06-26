// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userID:'',
    username: null,
    email: '',
    profileURL: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {
        username: null,
        email: '',
        profileURL: '',
        userID:''
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
