import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://apirepository.ncdc.go.ug/api'; // Change to match your API URL

function FolderManager() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folderContents, setFolderContents] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/folders`);
      setFolders(res.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName) return;
    try {
      await axios.post(`${API_BASE}/folders`, { name: folderName });
      setFolderName('');
      fetchFolders();
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleFolderSelect = async (folderId) => {
    setSelectedFolderId(folderId);
    try {
      const res = await axios.get(`${API_BASE}/folders/${folderId}`);
      setFolderContents(res.data.files || []);
    } catch (error) {
      console.error('Error loading folder contents:', error);
    }
  };

  const handleFileChange = async (event) => {
    if (!selectedFolderId) return;
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      await axios.post(`${API_BASE}/folders/${selectedFolderId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      handleFolderSelect(selectedFolderId); // Refresh contents
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

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
          <h2 className="font-semibold mb-2">Folders</h2>
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
          <h2 className="font-semibold mb-2">Folder Contents</h2>

          {selectedFolderId ? (
            <>
              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                />
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