import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  error: null,
  admincourse: null,
  chapter:[]
};
export const courseAdminSlice = createSlice({
  name: "courseAdmin",
  initialState,
  reducers: {
    courseAdmin: (state, action) => {
      state.course = action.payload;
      state.error = null;
    },
    getAdminCourse: (state, action) => {
      state.admincourse = action.payload;
    },
    createChapter:(state,action)=>{
      state.chapter=action.payload;
      state.error=null
    },
    getChapter:(state,action)=>{
      state.chapter=action.payload;
      state.error=null
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { courseAdmin, setError,getAdminCourse,createChapter,getChapter } = courseAdminSlice.actions;
export default courseAdminSlice.reducer;
