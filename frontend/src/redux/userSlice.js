import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userID: '',
    username: null,
    email: '',
    profileURL: '',
    token: ''
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
        userID: '',
        username: null,
        email: '',
        profileURL: '',
        token: ''
      };
    },
    updateProfileURL: (state, action) => {
      state.user.profileURL = action.payload;
    },
  },
});

export const { setUser, clearUser, updateProfileURL } = userSlice.actions;
export default userSlice.reducer;
