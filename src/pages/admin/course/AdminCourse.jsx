import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  courseAdminAction,
  getAdminCourses,  
} from "@/redux/Action/courseAdminAction";
import { Delete, DeleteIcon, Edit, LoaderPinwheel } from "lucide-react";
import { baseUrl } from "@/endpoint/Url";
import { getCategoryCourse } from "@/redux/Action/categoryAction";
import { IconDelta, IconEdit, IconId } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";


export const AdminCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    courseTitle: "",
    categoryName: "",
    category_id: "", 
    courseDescription: "",
    coursePrice: "",
    
  });

  const dispatch = useDispatch();
  const datacourse = useSelector((state) => state.adCourse?.admincourse);
  const categoryData = useSelector((state) => state.category?.courseCategory);

  const navigate=useNavigate()

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleCategoryChange = (value) => {
    const selectedCategory = categoryData?.data.find(
      (category) => category.categoryName === value
    );

    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        categoryName: selectedCategory.categoryName, 
        category_id: selectedCategory._id, 
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      setFormData({ ...formData, courseThumbnail: file });
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("courseTitle", formData.courseTitle);
      formDataToSend.append("category_id", formData.category_id); 
      formDataToSend.append("courseDescription", formData.courseDescription);
      formDataToSend.append("coursePrice", formData.coursePrice);

     
      formDataToSend.append("courseThumbnail", formData.courseThumbnail);
      

      

      await dispatch(courseAdminAction(formDataToSend));
      setFormData({
        courseTitle: "",
        categoryName: "",
        category_id: "",
        courseDescription: "",
        coursePrice: "",
        courseThumbnail: null,
      });
      toggleModal();
      dispatch(getAdminCourses());
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getAdminCourses());
    dispatch(getCategoryCourse());
  }, [dispatch]);

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = (id) => {
    console.log("Delete item with ID:", id);
  };

  const handleCourseDetails=(id)=>{
    navigate(`/admin/course-details/${id}`);
  }

  const tableData = {
    columns: [
      { name: "Thumbnail", value: "courseThumbnail" },
      { name: "Course Title", value: "courseTitle" },
      { name: "Category", value: "categoryName" },
      { name: "Description", value: "courseDescription" },
      { name: "Price", value: "coursePrice" },
      { name: "Status", value: "isPublished" },
      { name: "Action", value: "actions" },
    ],
    rows: datacourse?.courses.map((item) => ({
      
      courseThumbnail: (
        <img
          src={`${baseUrl}/${item.courseThumbnail}`}
          alt="Thumbnail"
          className="w-12 h-12 object-contain rounded-md"
        />
      ),
      courseTitle: item.courseTitle,
      categoryName: item.categoryName,
      courseDescription: item.courseDescription,
      coursePrice: item.coursePrice,
      // isPublished: item.isPublished ? "Published" : "Draft",
      isPublished: (
        <Switch/>
      ),
      
      actions: (
        <div className="flex justify-center space-x-2">
         <IconId stroke={2} size={40} className="bg-green-500 text-white px-2 py-1 rounded" onClick={()=>handleCourseDetails(item._id)} />
         
          <button
            onClick={() => handleEdit(item)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            <IconEdit/>
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            <DeleteIcon/>
          </button>
        </div>
      ),
    })),
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-2">
        <Button onClick={toggleModal}>Add</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoaderPinwheel className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <Table tableData={tableData} />
      )}

      <Modal isOpen={isModalOpen} onClose={toggleModal} size="2xl" title="Add New Course">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Course Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3 w-full">
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <input
                type="text"
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                name="coursePrice"
                value={formData.coursePrice}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryData?.data?.map((category) => (
                    <SelectItem key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
