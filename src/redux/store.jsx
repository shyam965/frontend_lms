import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Reducer/authSlice";
import { courseAdminSlice } from "./Reducer/courseAdminSlice";
import { categorySlice } from "./Reducer/categorySlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    adCourse: courseAdminSlice.reducer,
    category: categorySlice.reducer
  },
});
