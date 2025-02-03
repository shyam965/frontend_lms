import { baseUrl } from "@/endpoint/Url";
import axios from "axios";
import {
  createCourseCategory,
  getCourseCategory,
  setError,
} from "../Reducer/categorySlice";
import { toast } from "sonner";

export const createCategoryCourse = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/categories/create-category`,
      data
    );

    if (response.status == 201) {
      dispatch(createCourseCategory(response.data));
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response?.data?.message));
    toast.error(error.response?.data?.message);
  }
};

export const getCategoryCourse = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/categories/get-category`
    );

    if (response.status === 200) {
      dispatch(getCourseCategory(response.data));
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response?.data?.message));
    toast.error(error.response?.data?.message);
  }
};

export const updateCategoryCourse = (id, data) => async () => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/v1/categories/update-category/${id}`,
      data
    );

    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response?.data?.message));
    toast.error(error.response?.data?.message);
  }
};

export const deleteCategoryCourse = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/categories/delete-category/${id}`
    );

    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response?.data?.message));
    toast.error(error.response?.data?.message);
  }
};
