import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const API_BASE = 'http://localhost:5000/api'; // Change to match your API URL

function FolderManager() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folderContents, setFolderContents] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await axios.get(`${API_BASE}/folders`);
    setFolders(res.data);
  };

  const handleCreateFolder = async () => {
    if (!folderName) return;
    await axios.post(`${API_BASE}/folders`, { name: folderName });
    setFolderName('');
    fetchFolders();
  };

  const handleFolderSelect = async (folderId) => {
    setSelectedFolderId(folderId);
    const res = await axios.get(`${API_BASE}/folders/${folderId}`);
    setFolderContents(res.data.files || []);
  };

  const onDrop = async (acceptedFiles) => {
    if (!selectedFolderId || acceptedFiles.length === 0) return;

    const formData = new FormData();
    acceptedFiles.forEach(file => formData.append('files', file));

    await axios.post(`${API_BASE}/folders/${selectedFolderId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    handleFolderSelect(selectedFolderId); // Refresh folder contents
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Folder Manager</h1>

      <div className="mb-4">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="New folder name"
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateFolder} className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Folder
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/3 border p-2">
          <h2 className="font-semibold">Folders</h2>
          <ul>
            {folders.map(folder => (
              <li
                key={folder._id}
                onClick={() => handleFolderSelect(folder._id)}
                className={`cursor-pointer p-1 ${folder._id === selectedFolderId ? 'bg-gray-200' : ''}`}
              >
                {folder.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3 border p-2">
          <h2 className="font-semibold">Folder Contents</h2>

          {selectedFolderId ? (
            <>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-4 text-center my-2 cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop some files here, or click to select</p>
                )}
              </div>

              <ul>
                {folderContents.map(file => (
                  <li key={file._id}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      {file.originalName}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a folder to view and upload files.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FolderManager;
