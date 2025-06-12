import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadModal({ onUpload, parentId }) {
  const [file, setFile] = useState( null );
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (accepted) => setFile(accepted),
  });

  const handleUpload = () => {
    // files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file?.[ 0 ]);
      formData.append('folderId', parentId || '');
      onUpload( formData );
    // });
    // setFiles([]);
  };

  // console.log( "file", file )

  return (
    <div className="p-4 mt-2 border rounded-md bg-white">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click here to select afile and upload</p>
      </div>
      <ul>
        {/* {files.map((f, i) => ( */}
          {file && <li>{file?.name}</li>}
        {/* ))} */}
      </ul>
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}