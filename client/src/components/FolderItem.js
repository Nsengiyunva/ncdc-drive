import React from 'react';
import { FaFolder } from 'react-icons/fa';

export default function FolderItem({ folder, onClick }) {
  return (
    <div
      className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2"
      onClick={onClick}
    >
      {/* <Folder className="text-yellow-500" /> */}
      <FaFolder size={50} color="#FFA500" />
      {folder.name}
    </div>
  );
}