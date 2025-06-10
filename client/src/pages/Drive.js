import React, { useEffect, useState } from 'react';
import {
  getFoldersAndFiles,
  createFolder,
  uploadFile,
  getFiles
} from '../api/api';
import FolderItem from '../components/FolderItem';
import FileItem from '../components/FileItem';
import UploadModal from '../components/UploadModal';

export default function Drive() {
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [items, setItems] = useState({ folders: [], files: [] });
  const [folderName, setFolderName] = useState([]);

  const fetchItems = async () => {
    const res = await getFoldersAndFiles(currentFolderId);
    setItems( { folders: res.data } );
  };

  const fetchFiles = async ( id ) => {
    const res = await getFiles( id );
    setItems( { files: res.data } );
  }

  useEffect(() => {
    fetchItems();
  }, [currentFolderId]);

  const handleCreateFolder = async () => {
    if (!folderName) return;
    await createFolder({ name: folderName, parentId: currentFolderId });
    setFolderName('');
    fetchItems();
  };

  const handleUpload = async (formData) => {
    await uploadFile(formData);
    if( !currentFolderId ) {
      return alert( 'Please choose a folder first before proceeding...'  );
    }
    fetchFiles( currentFolderId );
  }

  const handleClickFolder = async ( folderId ) => {
    setCurrentFolderId( folderId )
    fetchFiles( folderId );
  }

  // console.log( 'we are here+', currentFolderId );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Drive</h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="border px-2 py-1 rounded"
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button
          onClick={handleCreateFolder}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          + Folder
        </button>
      </div>

      <UploadModal onUpload={handleUpload} parentId={currentFolderId} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {items.folders?.map((folder) => {
          return (
            <FolderItem
              key={folder._id}
              folder={folder}
              onClick={() => handleClickFolder( folder._id )}
            />
          )
        }
        )}

        {currentFolderId && (
          <>
            <p>{`We have file listing in this folder please ${currentFolderId}`}</p>
            {/* {items?.files?.map((file) => {
              console.log( file );
              return (
                <FileItem key={"1234"} file={{ name: "Kent",}} />
              )
            } )} */}
            {/* {items.files?.length} */}
            {items.files?.map( record => {
              console.log( record )
              return (
                <div key={record._id} className="p-2 border bg-red-500 w-20 h-20">
                  {record?.name}
                </div>
              )
            } )}
            
          </>
        )}

       
      </div>
    </div>
  );
}