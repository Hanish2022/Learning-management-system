import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 space-y-8 ">
        <div className="space-y-4 mt-20">
          <Link
            to="dashboard"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to="course"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-10 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
