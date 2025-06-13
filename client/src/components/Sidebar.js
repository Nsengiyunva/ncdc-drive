import React from 'react';
import { FiHome, FiFolder, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-40">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        NCDC Data Repository
      </div>
      <nav className="flex flex-col p-4 gap-4">
        <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition">
          <FiHome /> Dashboard
        </a>
        {/* <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition">
          <FiFolder /> Files
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition">
          <FiSettings /> Settings
        </a> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
