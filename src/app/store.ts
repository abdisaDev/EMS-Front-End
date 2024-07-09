import { configureStore } from '@reduxjs/toolkit';
import showOtpDialogReducer from '@/components/otpDialog/showOtpSlice';
import pathCheckerReducer from '@/pages/loginFormPage/routeSlice';

export const store = configureStore({
  reducer: {
    showOtpDialog: showOtpDialogReducer,
    pathChecker: pathCheckerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
