import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  error:null,
  profile:[]
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    profile:(state,action)=>{
      state.profile=action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { signup,login,setError,profile } = authSlice.actions;
export default authSlice.reducer;
