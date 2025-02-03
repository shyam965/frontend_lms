import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseCategory: [],
    error: null,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCourseCategory: (state, action) => {
            state.courseCategory = action.payload;
        },
        createCourseCategory: (state, action) => {
            state.courseCategory=action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
          },
        // updateCourseCategory: (state, action) => {
        //     state.courseCategory = state.courseCategory.map((category) =>
        //         category.id === action.payload.id ? action.payload : category
        //     );
        // },
        // deleteCourseCategory: (state, action) => {
        //     state.courseCategory = state.courseCategory.filter(category => category.id !== action.payload);
        // },
    },
});

export const { getCourseCategory, createCourseCategory,setError } = categorySlice.actions;
export default categorySlice.reducer;
