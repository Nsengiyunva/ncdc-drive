import React, { useEffect, useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.worker.min.js';

function FilePrev( { filename } ) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const canvasRef = useRef(null);
  const [ loading, setLoading ] = useState( false )

  // Fetch the file list from your API
  // useEffect(() => {
  //   async function fetchFiles() {
  //     const res = await fetch('/api/files'); // your API endpoint here
  //     const data = await res.json();
  //     setFiles(data);
  //   }
  //   fetchFiles();
  // }, []);

  // Render PDF if selected file is PDF

  useEffect( () => {
    if( filename && loading ) {
      setSelectedFile( filename );
      setLoading( false )
    }
  }, [ filename ])
  
  useEffect(() => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') return;

    const renderPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(selectedFile.url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    };

    renderPDF();
  }, [selectedFile]);

  const renderPreview = () => {
    if (!selectedFile) return <div>Select a file to preview</div>;

    const { url, type, name } = selectedFile;

    if (type === 'application/pdf') {
      return <canvas ref={canvasRef} style={{ border: '1px solid #000' }} />;
    }

    if (type.startsWith('image/')) {
      return <img src={url} alt={name} style={{ maxWidth: '100%', maxHeight: '600px' }} />;
    }

    if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Embed Google Docs viewer
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          style={{ width: '100%', height: '600px' }}
          frameBorder="0"
          title={name}
        />
      );
    }

    // Fallback for other types - just a download link
    return (
      <a href={url} download={name}>
        Download {name}
      </a>
    );
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* File list */}
      <div style={{ width: '250px', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
        <h3>Files</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {files.map((file) => (
            <li
              key={file.url}
              onClick={() => setSelectedFile(file)}
              style={{
                cursor: 'pointer',
                padding: '5px 0',
                fontWeight: selectedFile?.url === file.url ? 'bold' : 'normal',
              }}
            >
              {file.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Preview */}
      <div style={{ flexGrow: 1, paddingLeft: '10px' }}>
        {renderPreview()}
      </div>
    </div>
  );
}

export default FilePrev;
