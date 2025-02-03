import Modal from "@/components/Modal";
import Table from '@/components/Table';
import { Button } from "@/components/ui/button";
import { createCategoryCourse, getCategoryCourse, updateCategoryCourse, deleteCategoryCourse } from "@/redux/Action/categoryAction";
import { Delete, DeleteIcon, Edit2 } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { LuDelete } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const CourseCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: ""
  });

  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category?.courseCategory);

  useEffect(() => {
    dispatch(getCategoryCourse());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateCategoryCourse(selectedId, formData));
    } else {
      await dispatch(createCategoryCourse(formData));
    }
    setFormData({ categoryName: "" });
    setIsModalOpen(false);
    setIsEdit(false);
    setSelectedId(null);
    dispatch(getCategoryCourse());
  };

  const handleEdit = (item) => {
    setFormData({ categoryName: item.categoryName });
    setSelectedId(item._id);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      await dispatch(deleteCategoryCourse(id));
      dispatch(getCategoryCourse());
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setFormData({ categoryName: "" });
    setIsEdit(false);
    setSelectedId(null);
  };

  const tableData = {
    columns: [
      { name: "Category", value: "categoryName" },
      { name: "Action", value: "actions" },
    ],
    rows: categoryData?.data?.map((item) => ({
      categoryName: item?.categoryName,
      actions: (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            <Edit2/>
          </button>
          <button
            onClick={() => handleDelete(item._id)}
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

      <Table tableData={tableData} />

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        size="sm"
        title={isEdit ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 w-full">
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CourseCategory;
