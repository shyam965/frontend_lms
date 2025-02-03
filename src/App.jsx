import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./pages/admin/Sidebar";

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow ">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 Your Website Name. All rights reserved.
      </footer>
    </div>
  );
};
