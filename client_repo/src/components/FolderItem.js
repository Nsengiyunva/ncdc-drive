import React from 'react';
import { Folder } from 'lucide-react';

export default function FolderItem({ folder, onClick }) {
  return (
    <div
      className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2"
      onClick={onClick}
    >
      <Folder className="text-yellow-500" />
      {folder.name}
    </div>
  );
}