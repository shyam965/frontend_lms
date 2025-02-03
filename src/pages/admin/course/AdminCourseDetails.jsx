import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/endpoint/Url";
import { getAdminCourses, getChapters, postChapter } from "@/redux/Action/courseAdminAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AdminCourseDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    chapter_url: null,
  });

  const dispatch = useDispatch();
  
  const datacourse = useSelector((state) => state.adCourse?.admincourse);
  const chapterData = useSelector((state) => state.adCourse?.chapter);
  
  
  const chapters = Array.isArray(chapterData?.chapter) ? chapterData.chapter : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, chapter_url: file });
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", formData.Title);
      formDataToSend.append("Description", formData.Description);
      formDataToSend.append("chapter_url", formData.chapter_url);
      formDataToSend.append("course_id", id);

      await dispatch(postChapter(formDataToSend));

      setFormData({ Title: "", Description: "", chapter_url: null });
      setVideoPreview(null);
      toggleModal();
      dispatch(getChapters(id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (id) {
      dispatch(getAdminCourses(id));
      dispatch(getChapters(id));
    }
  }, [id, dispatch]);

  const courses = Array.isArray(datacourse?.courses)
    ? datacourse.courses.find((course) => course._id === id)
    : null;

  return (
    <>
      <div className="bg-green-600 text-white p-4 rounded-lg flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">{courses?.courseTitle}</h1>
        <Button className="bg-white text-green-600 font-bold px-4 py-2" onClick={toggleModal}>
          + Add Chapter
        </Button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white shadow-md p-4 rounded-lg border border-gray-300">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{courses?.courseDescription}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300 col-span-1 h-[400px]">
          <img src={`${baseUrl}/${courses?.courseThumbnail}`} alt={courses?.courseTitle} className="w-full rounded-lg mb-4" />
          <h2 className="text-2xl font-bold mb-2">{courses?.courseTitle}</h2>
          <div className="mt-4">
            <span className="text-xl font-semibold">Price: </span>
            <span className="text-green-600 text-xl">${courses?.coursePrice}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Chapters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <div key={chapter?._id} className="p-4 border rounded-lg shadow-md hover:bg-gray-100 transition">
              <p className="text-lg font-semibold">{chapter?.Title}</p>
              {chapter?.chapter_url && (
                <video controls className="w-full mt-2 rounded-lg">
                  <source src={`${baseUrl}/${chapter?.chapter_url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>

     
      <Modal isOpen={isModalOpen} onClose={toggleModal} size="xl" title="Add Chapter">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="file" accept="video/*" onChange={handleVideoChange} className="border rounded w-full py-2 px-3" />
          {videoPreview && (
            <video controls className="w-full mt-2 rounded-lg">
              <source src={videoPreview} type="video/mp4" />
            </video>
          )}
          <input
            type="text"
            name="Title"
            value={formData?.Title}
            onChange={handleChange}
            placeholder="Chapter Title"
            className="border rounded w-full py-2 px-3 focus:outline-blue-500"
          />
          <input
            type="text"
            name="Description"
            value={formData?.Description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded w-full py-2 px-3 focus:outline-blue-500"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AdminCourseDetails;
