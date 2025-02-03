import { Icon, LayoutDashboard } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Sidebar = () => {
  const sidebarItems = [
    {
      path: "/admin/dashboard",
      Icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      path: "/admin/courses",
      Icon: LayoutDashboard,
      title: "Courses",
    },
    {
      path:'/admin/categories',
      Icon:LayoutDashboard,
      title:"Course Category"
    }
  ];

  return (
    <>
      <div className="flex  lg:block w-[200px] md:w-[250px] lg:w-[250px] border border-gray-300 bg-gray-50 dark:border-gray-700  dark:bg-gray-900 h-full">
        <div className="">
          {sidebarItems.map(({ path, Icon, title }, index) => (
            <Link
              key={index}
              to={path}
              className="flex p-2 gap-2 text-xl items-center hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              <Icon className="w-6 h-6" />
              <span>{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
