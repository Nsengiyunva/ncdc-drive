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
//   };

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

import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Modal from '../components/Modal';
import TextFieldIcon from '../components/TextFieldIcon'
import { Formik } from 'formik'

export default function Drive() {
 
  const [ isModalOpen, setIsModalOpen ] = useState( false );

  const handleSubmit = async ( values ) => {
    console.log( values )
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-semibold">{``}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
        {`Add A New Folder`}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">Add A New Folder</h2>
        <Formik initialValues={{
          folder_name: ""
        }} onSubmit={handleSubmit}>
          { ( { values, errors, handleSubmit, handleChange } ) => {
            return (
              <form>
                <div className="grid grid-cols-1 gap-2">
                  <TextFieldIcon 
                    name="folder_name"
                    handleChange={handleChange}
                    value={values.folder_name} 
                    question="Directory name"
                    required={true}
                  />
                </div>
              </form>
            )
          } }
        </Formik>
      </Modal>
      </main>
    </div>
  )
}
