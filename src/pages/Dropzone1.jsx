// DropzoneComponent.jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const DropzoneComponent = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file)

    // Send the file to the backend
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://your-backend-api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '50px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <p>Drag & drop a PDF file here, or click to select one</p>
      )}
    </div>
  );
};

export default DropzoneComponent;
