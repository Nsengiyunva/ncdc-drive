import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FolderOpen, Upload } from 'lucide-react'; // Optional: lucide-react icons

const API_BASE = 'https://apirepository.ncdc.go.ug/api';

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
    if (!folderName) return alert( "Please add a folder name before proceeding..." );
    try {
      await axios.post(`${API_BASE}/folders`, { name: folderName });
      setFolderName('');
      fetchFolders();
    } catch (error) {
      console.error(  'Error creating folder:', error  );
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

  const handleFileChange = async ( evt ) => {
    if (!selectedFolderId) return alert("No folder has been selected yet.");
    console.log( selectedFolderId )
    console.log( evt.target.files?.[ 0 ] )
    let file =  evt.target.files?.[ 0 ]
    // const files = Array.from(event.target.files);
    // if (files.length === 0) return;

    const formData = new FormData();
    formData.append( 'folderId', selectedFolderId );
    formData.append( 'file', file )
    // files.forEach(file => formData.append('files', file));

    try {
      await axios.post(`${API_BASE}/files/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      handleFolderSelect(selectedFolderId);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };


  let selected_folder =  folders.filter( folder =>  folder._id  === selectedFolderId  )?.[ 0 ]?.name;

  // console.log( "folder", selected_folder )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Drive Clone</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="New folder name"
            className="border rounded px-3 py-2 text-sm"
          />
          <button
            onClick={handleCreateFolder}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            Create Folder
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-white shadow-sm rounded-lg p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Folders</h2>
          <ul className="space-y-2">
            {folders.map(folder => (
              <li
                key={folder._id}
                onClick={() => handleFolderSelect(folder._id)}
                className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition ${
                  folder._id === selectedFolderId ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                <FolderOpen size={16} />
                <span className="text-sm">{folder.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-span-9 bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            {`Folder Contents  - ${selected_folder ?  selected_folder : ""}`}
          </h2>

          {selectedFolderId ? (
            <>
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md w-max">
                  <Upload size={16} />
                  <span className="text-sm font-medium">Upload Files</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {folderContents.map(file => (
                  <div
                    key={file._id}
                    className="border rounded p-2 bg-gray-50 hover:bg-gray-100 transition text-sm"
                  >
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      📄 {file.originalName}
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600">Select a folder to view and upload files.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FolderManager;
