import axios from "axios";
import { baseUrl } from "@/endpoint/Url";

import { toast } from "sonner";
import { courseAdmin, getAdminCourse, setError,createChapter,getChapter } from "../Reducer/courseAdminSlice";

export const courseAdminAction = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    
    
    const response = await axios.post(
      `${baseUrl}/api/v1/courses/create-courses`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

 

    if (response.status === 201) {
      dispatch(courseAdmin(response.data));
      toast.success(response.data.message || "Course created successfully");
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

export const getAdminCourses = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.get(`${baseUrl}/api/v1/courses/get-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response,"ooooo")
 

    if (response.status === 200) {
      dispatch(getAdminCourse(response.data));
      toast.success(response.data.message || "Profile fetched successfully");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to fetch profile");
  }
};


export const postChapter = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    
    
    const response = await axios.post(
      `${baseUrl}/api/v1/chapters/create-chapter`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      dispatch(createChapter(response.data));
      toast.success(response.data.message || "Chapter created successfully");
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response.data.message));
    toast.error(error.response.data.message);
  }
};


export const getChapters = (course_id) => async (dispatch) => {
  console.log(course_id,"courser_idddd")
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.get(`${baseUrl}/api/v1/chapters/get-chapter/${course_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response,"slksdlksdskskdjsdkj")

    
 

    if (response.status === 200) {
      dispatch(getChapter(response.data));
      toast.success(response.data.message || "chapter fetched successfully");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to fetch profile");
  }
};
