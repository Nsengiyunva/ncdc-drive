// import React, { useEffect, useState } from 'react';
// import {
//   getFoldersAndFiles,
//   createFolder,
//   uploadFile,
//   getFiles
// } from '../api/api';
// import FolderItem from '../components/FolderItem';
// import FileItem from '../components/FileItem';
// import UploadModal from '../components/UploadModal';
// import { FaFolder } from 'react-icons/fa'; 


// export default function Drive() {
//   const [currentFolderId, setCurrentFolderId] = useState(null);
//   const [items, setItems] = useState({ folders: [], files: [] });
//   const [folderName, setFolderName] = useState([]);
//   const [ selectedFile, setSelectedFile ] = useState( null );
//   const fetchItems = async () => {
//     const res = await getFoldersAndFiles(currentFolderId);
//     setItems( { folders: res.data } );
//   };

//   const fetchFiles = async ( id ) => {
//     const res = await getFiles( id );
//     setItems( { files: res.data } );
//   }

//   useEffect(() => {
//     fetchItems();
//   }, [currentFolderId]);

//   const handleCreateFolder = async () => {
//     if (!folderName) return;
//     await createFolder({ name: folderName, parentId: currentFolderId });
//     setFolderName('');
//     fetchItems();
//   }

//   const handleUpload = async (formData) => {
//     await uploadFile(formData);
//     if( !currentFolderId ) {
//       return alert( 'Please choose a folder first before proceeding...'  );
//     }
//     fetchFiles( currentFolderId );
//   }
//   const handleClickFolder = async ( folderId ) => {
//     setCurrentFolderId( folderId )
//     fetchFiles( folderId );
//   }
//   const handleDisplayFile = async ( file ) => {
//     window.open( 'https://apirepository.ncdc.go.ug/uploads/' + file, '_blank', 'noopener,noreferrer');
//   }
//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">My Drive</h1>
//       <div className="flex items-center gap-2 mb-4">
//         <input
//           className="border px-2 py-1 rounded"
//           type="text"
//           placeholder="Folder name"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//         />
//         <button
//           onClick={handleCreateFolder}
//           className="bg-green-600 text-white px-4 py-1 rounded"
//         >
//           + Folder
//         </button>
//       </div>
//       <UploadModal onUpload={handleUpload} parentId={currentFolderId} />
//       <FaFolder size={50} color="#FFA500" />
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//         {items.folders?.map((folder) => {
//           return (
//             <FolderItem
//               key={folder._id}
//               folder={folder}
//               onClick={() => handleClickFolder( folder._id )}
//             />
//           )
//         }
//         )}

//         {currentFolderId && (
//           <>
//             <p>{`Folder Item: ${currentFolderId}`}</p>
//             {items.files?.map( record => {
//              let actual_file = record?.filePath.split("/");
//               return (
//                 <div key={record._id} className="p-2 border bg-red-500 w-20 h-20" onClick={() => handleDisplayFile( actual_file?.[ 1 ] )}>
//                   {record?.name}
//                 </div>
//               )
//             } )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Modal from '../components/Modal';
import TextFieldIcon from '../components/TextFieldIcon'
import { Formik } from 'formik'
import FolderItem from '../components/FolderItem';

import {
  getFoldersAndFiles,
  createFolder,
  uploadFile,
  getFiles
} from '../api/api';

export default function Drive( {} ) {
 
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const [ isUploading, setUploading ] = useState( false )
  const [ currentFolderId, setCurrentFolderId] = useState(null);
  const [ items, setItems] = useState({ folders: [], files: [] });
  const [ folderName, setFolderName] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [currentFolderId]);

    const fetchItems = async () => {
      const res = await getFoldersAndFiles(currentFolderId);
      setItems( { folders: res.data } );
    };

  const handleSubmit = async ( values ) => {
    try {
      if (!folderName) return alert( "Folder name cannot be empty." )
      await createFolder({ name: values?.folder_name, parentId: currentFolderId });
      setFolderName('');
      fetchItems();
      setIsModalOpen( false )
    } catch (error) {
      setIsModalOpen( false )
      return alert( "An error occured on the server." )
    }
  }

  const handleClickFolder = async ( folderId ) => {
    setCurrentFolderId( folderId )
    fetchFiles( folderId );
  }

  const fetchFiles = async ( id ) => {
    const res = await getFiles( id );
    setItems( { files: res.data } );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full overflow-y-scroll">
        <h1 className="text-3xl font-semibold">{``}</h1>

        <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-500">
          {`Add A New Folder`}
        </button>

      <div class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] py-2">
        {/* <div class="bg-gray-200 p-2 rounded-sm grid grid-cols-1 gap-1">
           <FaFolder size={50} color="#FFA500" />
           <div className="flex items-start justify-start">
            <div>{`Test 1`}</div>
           </div>
        </div> */}
        {/* <div class="bg-gray-200 p-2 rounded-sm">Item 2</div>
        <div class="bg-gray-200 p-2 rounded-sm">Item 3</div>
        <div class="bg-gray-200 p-2 rounded-sm">Item 4</div>
        <div class="bg-gray-200 p-2 rounded-sm">Item 5</div> */}
        
        {items.folders?.map((folder) => {
          return (
            <FolderItem
              key={folder._id}
              folder={folder}
              onClick={() => handleClickFolder( folder._id )}
            />
          )
        } )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">Add A New Folder</h2>
        <Formik initialValues={{
          folder_name: ""
        }} onSubmit={handleSubmit}>
          { ( { values, errors, handleSubmit, handleChange, isSubmitting } ) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-2">
                  <TextFieldIcon 
                    name="folder_name"
                    handleChange={ evt => {
                      setFolderName( evt.target.value )
                      handleChange( evt )
                    }}
                    value={values.folder_name} 
                    question="Directory name"
                    label="Directory name"
                    required={true}
                  />

                  <div className="flex flex-row">
                    <button type="button" onClick={() => setIsModalOpen( false )} className="mx-2 bg-red-500 px-2 text-white text-xs rounded">
                      {`Cancel`}
                    </button>
                    <button type="submit" disabled={isUploading || isSubmitting} className="px-2 mx-2 bg-green-800 text-white text-xs rounded">
                      {`Submit`}
                    </button>
                  </div>
                </div>
              </form>
            ) } }
        </Formik>
      </Modal>
      </main>
    </div>
  )
}
