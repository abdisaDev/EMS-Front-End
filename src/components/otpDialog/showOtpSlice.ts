import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShowOtpDialog {
  value: boolean;
}

const initialState: ShowOtpDialog = {
  value: false,
};

export const showOtpDialog = createSlice({
  name: "showOtpDialog",
  initialState,
  reducers: {
    show: (state) => {
      console.log(state, "state");
      state.value = true;
    },

    hide: (state) => {
      console.log(state, "state");
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, hide } = showOtpDialog.actions;

export default showOtpDialog.reducer;
