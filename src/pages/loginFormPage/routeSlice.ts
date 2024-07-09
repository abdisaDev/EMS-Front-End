import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pathChanged: false,
  role: '',
};

export const pathChecker = createSlice({
  name: 'path-checker',
  initialState,
  reducers: {
    isPathChanged: (state, action) => {
      state.pathChanged = action.payload;
    },
    userRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { isPathChanged, userRole } = pathChecker.actions;

export default pathChecker.reducer;
