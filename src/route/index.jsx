import { createBrowserRouter, Outlet } from "react-router-dom";
import { App } from "../App";
import React from "react";

import { Login } from "@/pages/Login";
import { HeroSection } from "@/pages/student/HeroSection";
import { Courses } from "@/pages/student/Courses";
import { Profile } from "@/pages/student/Profile";
import { Sidebar } from "@/pages/admin/Sidebar";
import { AdminCourse } from "@/pages/admin/course/AdminCourse";
import { Dashboard } from "@/pages/admin/Dashboard";
import { Navbar } from "@/components/Navbar";
import CourseCategory from "@/pages/admin/CourseCategory";
import AdminCourseDetails from "@/pages/admin/course/AdminCourseDetails";

// import { HeroSection } from "@/pages/student/HeroSection";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto max-h-[90vh]">
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/edit-profile",
        element: <Profile />,
      },

      // admin rotes parts
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        path: "courses",
        element: <AdminCourse />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "categories",
        element: <CourseCategory />,
      },
      {
        path: "course-details/:id",
        element: <AdminCourseDetails />,
      },
    ],
  },
]);

export default router;
