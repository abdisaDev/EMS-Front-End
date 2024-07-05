import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShowOtpDialog {
  value: boolean;
  otp: string;
  isOtpVerified: boolean;
}

const initialState: ShowOtpDialog = {
  value: false,
  otp: '',
  isOtpVerified: false,
};

export const showOtpDialog = createSlice({
  name: 'showOtpDialog',
  initialState,
  reducers: {
    show: (state) => {
      state.value = true;
    },
    otpValue: (state, action) => {
      state.otp = action.payload;
    },
    isOtpVerified: (state, action) => {
      state.isOtpVerified = action.payload;
    },
    hide: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, hide, otpValue, isOtpVerified } = showOtpDialog.actions;

export default showOtpDialog.reducer;
