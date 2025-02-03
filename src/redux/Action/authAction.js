import axios from "axios";
import { baseUrl } from "@/endpoint/Url";
import { login, profile, setError, signup } from "../Reducer/authSlice";
import { toast } from "sonner";

export const signupAction = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/user/signup`, data);
    
    if (response.status == 201) {
      dispatch(signup(response.data));
      toast.success(response.data.message || "created successfully");
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response.data.message || "Signup failed"));
    toast.error(error.response.data.message);
  }
};

export const loginAction = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/user/login`, data);

    const token = response.data.accessToken;

    localStorage.setItem("token", token);

    if (response.status == 200) {
      dispatch(login(response.data));
      toast.success(response.data.message || "Login successfully");
      navigate("/");
    }
  } catch (error) {
    dispatch(setError(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, "llllllllllllllllll");

    if (response.status === 200) {
      dispatch(profile(response.data));
      toast.success(response.data.message || "Profile fetched successfully");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to fetch profile");
  }
};
