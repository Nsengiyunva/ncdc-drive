import React from 'react';
import { File } from 'lucide-react';

export default function FileItem({ file }) {
  return (
    <a
      href={file.filePath}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 border rounded-lg flex items-center gap-2 hover:bg-gray-100"
    >
      <File className="text-blue-500" />
      {file.name}
    </a>
  );
}