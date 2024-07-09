import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pathChanged: false,
};

export const pathChecker = createSlice({
  name: 'path-checker',
  initialState,
  reducers: {
    isPathChanged: (state, action) => {
      state.pathChanged = action.payload;
    },
  },
});

export const { isPathChanged } = pathChecker.actions;

export default pathChecker.reducer;
